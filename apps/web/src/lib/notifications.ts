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

export async function getUnreadMessagesCount(): Promise<number> {
  try {
    const res = await api.get('/api/conversations/unread-count');
    return typeof res.data === 'number' ? res.data : 0;
  } catch {
    return 0;
  }
}
