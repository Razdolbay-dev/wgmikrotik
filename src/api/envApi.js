export async function getEnv() {
    const res = await fetch('/api/env');
    return res.json();
}

export async function saveEnv(data) {
    const res = await fetch('/api/env', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}
