import api from './api';

export async function getUnreadCount(): Promise<number> {
  try {
    const res = await api.get('/api/notifications?limit=50');
    const list: { read: boolean }[] = res.data.data ?? res.data.notifications ?? [];
    return list.filter((n) => !n.read).length;
  } catch {
    return 0;
  }
}
