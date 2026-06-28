'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api';
import { useSearchParams } from 'next/navigation';
import { io, Socket } from 'socket.io-client';

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConv, setActiveConv] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [msgLoading, setMsgLoading] = useState(false);
  const [search, setSearch] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [myUserId, setMyUserId] = useState('');
  const [openedConvs, setOpenedConvs] = useState<Set<string>>(new Set());
  const myUserIdRef = useRef('');
  const [usernames, setUsernames] = useState<Record<string, string>>({});
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    let userId = '';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userId = payload.sub;
      setMyUserId(userId);
      myUserIdRef.current = userId;
    } catch {}

    fetchConversations(userId, searchParams.get('id') || undefined);

    const socket = io('http://localhost:3006/chat', {
      auth: { token },
      transports: ['websocket'],
    });
    socketRef.current = socket;

    socket.on('message', (msg: any) => {
      setMessages(prev => {
      const exists = prev.some((m: any) => m._id === msg._id);
      if (exists) return prev;
      return [...prev, msg];
    });
      setConversations(prev => prev.map(c =>
        c._id === msg.conversationId
          ? { ...c, lastMessage: msg.text, updatedAt: msg.createdAt }
          : c
      ));
    });

    return () => { socket.disconnect(); };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchConversations = async (myId: string, autoOpenId?: string) => {
    try {
      const res = await api.get('/api/conversations');
      const convs = res.data || [];
      setConversations(convs);

      const otherIds = [...new Set(convs.map((c: any) =>
        c.participant1Id === myId ? c.participant2Id : c.participant1Id
      ))] as string[];

      const resolved: Record<string, string> = {};
      await Promise.all(otherIds.map(async (id: string) => {
        try {
          const r = await api.get(`/api/auth/users/${id}`);
          resolved[id] = r.data?.username || id.slice(0, 8);
        } catch { resolved[id] = id.slice(0, 8); }
      }));
      setUsernames(resolved);

      if (autoOpenId) {
        const target = convs.find((c: any) => c._id === autoOpenId);
        if (target) openConversation(target);
      }
    } catch {} finally {
      setLoading(false);
    }
  };

  const openConversation = async (conv: any) => {
    setActiveConv(conv);
    setOpenedConvs(prev => new Set([...prev, conv._id]));
    setMsgLoading(true);
    setMessages([]);
    socketRef.current?.emit('join', { conversationId: conv._id });
    try {
      const res = await api.get(`/api/conversations/${conv._id}/messages`);
      const fetched = (res.data.messages || []).reverse();
      setMessages(fetched);
      await api.patch(`/api/conversations/${conv._id}/messages/read`);
    } catch {} finally {
      setMsgLoading(false);
    }
  };

  const sendMessage = () => {
    if (!input.trim() || !activeConv || !socketRef.current) return;
    socketRef.current.emit('message', {
      conversationId: activeConv._id,
      text: input.trim(),
    });
    setInput('');
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return 'Today';
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  const getOtherParticipant = (conv: any) => {
    const myId = myUserIdRef.current || myUserId;
    const otherId = conv.participant1Id === myId ? conv.participant2Id : conv.participant1Id;
    return { userId: otherId, username: usernames[otherId] || otherId?.slice(0, 8) };
  };

  const filteredConvs = conversations.filter(c => {
    const other = getOtherParticipant(c);
    return other?.username?.toLowerCase().includes(search.toLowerCase()) || !search;
  });

  const sortedMessages = [...messages].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  const groupedMessages: { date: string; msgs: any[] }[] = [];
  sortedMessages.forEach(msg => {
    const date = formatDate(msg.createdAt);
    const last = groupedMessages[groupedMessages.length - 1];
    if (last && last.date === date) {
      last.msgs.push(msg);
    } else {
      groupedMessages.push({ date, msgs: [msg] });
    }
  });

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <div className="w-80 shrink-0 border-r border-[#e2e8f0] flex flex-col">
        <div className="px-5 py-4 border-b border-[#e2e8f0]">
          <div className="flex items-center justify-between mb-4">
            <Link href="/"><Image src="/logo.svg" alt="RooMate" width={100} height={26} priority /></Link>
          </div>
          <h1 className="text-lg font-bold text-[#061b32]">Messages</h1>
          <p className="text-xs text-[#061b32]/40">Chat with people and stay connected.</p>
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#e2e8f0] px-3 py-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#061b32" strokeWidth="2" className="text-[#061b32]/30"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages..." className="text-sm text-[#061b32] placeholder:text-[#061b32]/30 focus:outline-none bg-transparent w-full" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="h-12 w-12 rounded-full bg-[#f0f7f7]" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-24 rounded bg-[#f0f7f7]" />
                    <div className="h-3 w-40 rounded bg-[#f0f7f7]" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredConvs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <svg className="text-[#9fdbda] mb-3" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <p className="text-sm font-medium text-[#061b32]">No conversations yet</p>
              <p className="text-xs text-[#061b32]/40 mt-1">Message a property owner to start chatting</p>
            </div>
          ) : (
            filteredConvs.map(conv => {
              const other = getOtherParticipant(conv);
              const isActive = activeConv?._id === conv._id;
              const initials = other?.username?.slice(0, 2).toUpperCase() || '??';
              return (
                <button key={conv._id} onClick={() => openConversation(conv)} className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${isActive ? 'bg-[#f0f7f7] border-r-2 border-[#9fdbda]' : 'hover:bg-[#f8fafa]'}`}>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#9fdbda]/20 text-sm font-bold text-[#061b32]">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-[#061b32] truncate">{other?.username || 'Unknown'}</p>
                      <p className="text-xs text-[#061b32]/40 shrink-0 ml-2">{conv.updatedAt ? formatDate(conv.updatedAt) : ''}</p>
                    </div>
                    <p className="text-xs text-[#061b32]/50 truncate mt-0.5">{conv.lastMessage || 'Start a conversation'}</p>
                  </div>
                  {!openedConvs.has(conv._id) && conv._id !== activeConv?._id && (
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#9fdbda]"></span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {activeConv ? (
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#9fdbda]/20 text-sm font-bold text-[#061b32]">
                {getOtherParticipant(activeConv)?.username?.slice(0, 2).toUpperCase() || '??'}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#061b32]">{getOtherParticipant(activeConv)?.username || 'Unknown'}</p>
                <p className="text-xs text-[#9fdbda]">Online</p>
              </div>
            </div>
            <button className="text-[#061b32]/40 hover:text-[#061b32] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {msgLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-sm text-[#061b32]/40">Loading messages...</div>
              </div>
            ) : (
              groupedMessages.map((group, gi) => (
                <div key={`${group.date}-${gi}`}>
                  <div className="flex items-center justify-center mb-4">
                    <span className="rounded-full bg-[#f0f7f7] px-3 py-1 text-xs text-[#061b32]/40">{group.date}</span>
                  </div>
                  <div className="space-y-2">
                    {group.msgs.map((msg: any) => {
                      const isMine = msg.senderId === myUserId;
                      return (
                        <div key={msg._id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md rounded-2xl px-4 py-2.5 ${isMine ? 'bg-[#9fdbda]/20 rounded-tr-sm' : 'bg-[#f8fafa] border border-[#e2e8f0] rounded-tl-sm'}`}>
                            <p className="text-sm text-[#061b32]">{msg.text}</p>
                            <div className={`flex items-center gap-1 mt-1 ${isMine ? 'justify-end' : 'justify-start'}`}>
                              <p className="text-xs text-[#061b32]/30">{formatTime(msg.createdAt)}</p>
                              {isMine && (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={msg.read ? '#9fdbda' : '#061b32'} strokeWidth="2" opacity={msg.read ? 1 : 0.3}>
                                  <polyline points="20 6 9 17 4 12"/><polyline points="16 6 5 17"/>
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-6 py-4 border-t border-[#e2e8f0]">
            <div className="flex items-center gap-3 rounded-2xl border border-[#e2e8f0] bg-[#f8fafa] px-4 py-3">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 text-sm text-[#061b32] placeholder:text-[#061b32]/30 focus:outline-none bg-transparent"
              />
              <button onClick={sendMessage} disabled={!input.trim()} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#9fdbda] text-[#061b32] hover:opacity-90 transition-opacity disabled:opacity-30">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center bg-[#f8fafa]">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#9fdbda]/20 mb-4">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#9fdbda" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <p className="text-lg font-semibold text-[#061b32]">Your Messages</p>
          <p className="text-sm text-[#061b32]/40 mt-1 max-w-xs">Select a conversation from the left to start chatting</p>
        </div>
      )}
    </div>
  );
}
