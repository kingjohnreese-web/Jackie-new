import { useForm } from "react-hook-form";
import { useAdminLogin } from "@workspace/api-client-react";
import { useAuth } from "@/store/use-auth";
import { useLocation } from "wouter";

export default function Login() {
  const login = useAdminLogin();
  const setToken = useAuth(s => s.setToken);
  const [, setLocation] = useLocation();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    login.mutate({ data }, {
      onSuccess: (res) => {
        if (res.success && res.token) {
          setToken(res.token);
          setLocation("/admin");
        } else {
          alert("Login failed");
        }
      },
      onError: () => alert("Invalid credentials")
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-3xl shadow-xl shadow-primary/5 border border-border/50">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-primary">Admin Panel</h1>
          <p className="text-muted-foreground mt-2">Sign in to manage Jackie Peanuts</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">Email</label>
            <input 
              type="email" 
              {...register("email")} 
              defaultValue="jackiepeanutske@gmail.com"
              className="w-full rounded-xl border-2 border-border px-4 py-3 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">Password</label>
            <input 
              type="password" 
              {...register("password")} 
              className="w-full rounded-xl border-2 border-border px-4 py-3 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10" 
            />
          </div>
          <button 
            type="submit" 
            disabled={login.isPending}
            className="w-full h-14 rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:-translate-y-0.5 disabled:opacity-50"
          >
            {login.isPending ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
