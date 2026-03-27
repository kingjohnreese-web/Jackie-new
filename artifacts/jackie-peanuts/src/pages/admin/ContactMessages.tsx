import { AdminLayout } from "@/components/layout/AdminLayout";
import { useListContactMessages } from "@workspace/api-client-react";
import { useAuthHeaders } from "@/store/use-auth";
import { format } from "date-fns";

export default function ContactMessages() {
  const authHeaders = useAuthHeaders();
  const { data: messages, isLoading } = useListContactMessages({ request: authHeaders });

  if (isLoading) return <AdminLayout><div>Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-primary">Contact Messages</h1>
      </div>

      <div className="grid gap-6">
        {messages?.map(msg => (
          <div key={msg.id} className="bg-card rounded-2xl border border-border/50 shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-primary">{msg.name}</h3>
                <p className="text-muted-foreground text-sm">{msg.email} {msg.phone ? `| ${msg.phone}` : ''}</p>
              </div>
              <span className="text-xs text-muted-foreground">
                {format(new Date(msg.createdAt), "MMM d, yyyy HH:mm")}
              </span>
            </div>
            
            {msg.subject && (
              <div className="font-semibold text-sm mb-2 text-accent">Subject: {msg.subject}</div>
            )}
            <p className="text-muted-foreground bg-muted/30 p-4 rounded-xl text-sm">
              {msg.message}
            </p>
          </div>
        ))}
        {!messages?.length && (
          <div className="text-center py-12 text-muted-foreground bg-card rounded-2xl border">
            No messages received yet.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
