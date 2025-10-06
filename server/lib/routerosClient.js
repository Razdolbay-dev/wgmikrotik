// routerosClient.js
import net from 'net';

// --- кодировка ---
function encodeLength(len) {
    if (len < 0x80) return Buffer.from([len]);
    if (len < 0x4000) return Buffer.from([(len >> 8) | 0x80, len & 0xff]);
    if (len < 0x200000) return Buffer.from([(len >> 16) | 0xC0, (len >> 8) & 0xff, len & 0xff]);
    throw new Error("Word too long for demo");
}

function encodeWord(word) {
    const str = Buffer.from(word, 'utf8');
    return Buffer.concat([encodeLength(str.length), str]);
}

function encodeSentence(words) {
    return Buffer.concat([...words.map(encodeWord), Buffer.from([0])]);
}

// --- декодер ---
function decodeWords(buffer) {
    let offset = 0;
    const words = [];
    while (offset < buffer.length) {
        const len = buffer[offset];
        if (len === 0) {
            offset++;
            break;
        }
        if (len < 0x80) {
            const word = buffer.toString('utf8', offset + 1, offset + 1 + len);
            words.push(word);
            offset += 1 + len;
        } else {
            throw new Error("Decode for >127 bytes not implemented in demo");
        }
    }
    return { words, rest: buffer.slice(offset) };
}

// --- парсер результата в объект ---
function parseReEntry(entry) {
    const obj = {};
    for (const item of entry) {
        if (item.startsWith('=')) {
            const [key, ...rest] = item.slice(1).split('=');
            obj[key] = rest.join('=');
        }
    }
    return obj;
}

// --- основной клиент ---
export async function sendCommand({ host, user, pass }, commandWords) {
    return new Promise((resolve, reject) => {
        const client = net.connect({ host, port: 8728 }, () => {
            client.write(encodeSentence(['/login', `=name=${user}`, `=password=${pass}`]));
        });

        let buffer = Buffer.alloc(0);
        let loggedIn = false;
        const results = [];

        client.on('data', (chunk) => {
            buffer = Buffer.concat([buffer, chunk]);

            try {
                while (buffer.length > 0) {
                    const { words, rest } = decodeWords(buffer);
                    if (words.length === 0) break;
                    buffer = rest;

                    if (words[0] === '!done' && !loggedIn) {
                        loggedIn = true;
                        client.write(encodeSentence(commandWords));
                    } else if (words[0] === '!done' && loggedIn) {
                        client.end();
                        // парсим все !re в объекты
                        const parsed = results.map(parseReEntry);
                        resolve(parsed);
                    } else if (words[0].startsWith('!re') || words[0] === '!trap') {
                        results.push(words);
                    }
                }
            } catch (e) {
                // ждём пока придёт полный пакет
            }
        });

        client.on('error', reject);
    });
}
