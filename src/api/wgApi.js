import axios from 'axios';

const api = axios.create({
    baseURL: '/api/wg'
});

export async function getInterfaces() {
    const res = await api.get('/interfaces');
    return res.data;
}

export async function getPeers(iface) {
    const res = await api.get(iface ? `/peers/${iface}` : '/peers');
    return res.data;
}

export async function addPeer(data) {
    const res = await api.post('/peer', data);
    return res.data;
}

export async function deletePeer(id) {
    const res = await api.delete(`/peer/${id}`);
    return res.data;
}
