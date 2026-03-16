"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {LoaderCircle, ShieldCheck} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {useAdminI18n} from "@/components/admin/admin-locale-provider";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {readResponsePayload} from "@/lib/read-response-payload";
import {adminLoginSchema} from "@/lib/validations/auth";

type LoginValues = z.infer<typeof adminLoginSchema>;

export function AdminLoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {dictionary} = useAdminI18n();
  const form = useForm<LoginValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "admin@example.com",
      password: "ChangeMe123!"
    }
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });
      const payload = await readResponsePayload<{error?: string}>(response);

      if (!response.ok) {
        setServerError(payload?.error || dictionary.login.loginFailed);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setServerError(dictionary.login.unavailable);
    }
  });

  return (
    <Card className="w-full max-w-lg">
      <CardContent className="space-y-5">
        <div className="rounded-[2rem] border border-gold-500/15 bg-gold-500/8 p-4 text-start">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-200">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm text-sand-50">{dictionary.login.secureAccessTitle}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.24em] text-gold-200/65">
                {dictionary.login.secureAccessHint}
              </p>
            </div>
          </div>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <Label htmlFor="admin-email">{dictionary.common.email}</Label>
            <Input id="admin-email" type="email" {...form.register("email")} />
            <p className="mt-1 text-xs text-red-300">{form.formState.errors.email?.message}</p>
          </div>
          <div>
            <Label htmlFor="admin-password">{dictionary.common.password}</Label>
            <Input id="admin-password" type="password" {...form.register("password")} />
            <p className="mt-1 text-xs text-red-300">{form.formState.errors.password?.message}</p>
          </div>
          {serverError ? <p className="text-sm text-red-300">{serverError}</p> : null}
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <LoaderCircle className="me-2 h-4 w-4 animate-spin" />
                {dictionary.login.signingIn}
              </>
            ) : (
              dictionary.login.signIn
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
