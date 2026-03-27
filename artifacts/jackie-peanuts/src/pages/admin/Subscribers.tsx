import { AdminLayout } from "@/components/layout/AdminLayout";
import { useListSubscribers, useBroadcastToSubscribers } from "@workspace/api-client-react";
import { useAuthHeaders } from "@/store/use-auth";
import { useState } from "react";

export default function Subscribers() {
  const authHeaders = useAuthHeaders();
  const { data: subscribers, isLoading } = useListSubscribers({ request: authHeaders });
  const broadcast = useBroadcastToSubscribers({ request: authHeaders });
  
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if(!subject || !message) return;
    broadcast.mutate({ data: { subject, message } }, {
      onSuccess: () => {
        alert("Broadcast sent successfully!");
        setSubject("");
        setMessage("");
      }
    });
  };

  if (isLoading) return <AdminLayout><div>Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-primary">Subscribers</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6">
          <h2 className="font-bold text-xl mb-6">Send Broadcast</h2>
          <form onSubmit={handleBroadcast} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Subject</label>
              <input value={subject} onChange={e => setSubject(e.target.value)} className="w-full rounded-xl border px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Message</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} rows={6} className="w-full rounded-xl border px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" required />
            </div>
            <button disabled={broadcast.isPending} className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 disabled:opacity-50">
              {broadcast.isPending ? "Sending..." : "Send to All"}
            </button>
          </form>
        </div>

        <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 overflow-hidden flex flex-col">
          <h2 className="font-bold text-xl mb-6">Subscriber List ({subscribers?.length || 0})</h2>
          <div className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-border/50">
              {subscribers?.map(sub => (
                <li key={sub.id} className="py-3">
                  <p className="font-medium">{sub.email}</p>
                  {sub.name && <p className="text-xs text-muted-foreground">{sub.name}</p>}
                </li>
              ))}
              {!subscribers?.length && (
                <li className="py-4 text-muted-foreground text-center">No subscribers yet.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
