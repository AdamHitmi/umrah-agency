"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {useAdminI18n} from "@/components/admin/admin-locale-provider";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {faqSchema} from "@/lib/validations/faq";

type FaqFormValues = z.infer<typeof faqSchema>;

type FaqFormProps = {
  mode: "create" | "edit";
  faq?: FaqFormValues & {id?: string};
};

const defaultValues: FaqFormValues = {
  questionAr: "",
  questionFr: "",
  answerAr: "",
  answerFr: "",
  sortOrder: 0,
  active: true
};

export function FaqForm({mode, faq}: FaqFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {dictionary} = useAdminI18n();
  const form = useForm<FaqFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: faq ?? defaultValues
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);
    const endpoint = mode === "create" ? "/api/admin/faqs" : `/api/admin/faqs/${faq?.id}`;
    const method = mode === "create" ? "POST" : "PATCH";
    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    const payload = await response.json();

    if (!response.ok) {
      setServerError(payload.error || dictionary.faqForm.unable);
      return;
    }

    if (mode === "create") {
      form.reset(defaultValues);
    }

    router.refresh();
  });

  return (
    <Card>
      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor={`faq-questionAr-${faq?.id ?? "new"}`}>
                {dictionary.faqForm.questionAr}
              </Label>
              <Input id={`faq-questionAr-${faq?.id ?? "new"}`} {...form.register("questionAr")} />
            </div>
            <div>
              <Label htmlFor={`faq-questionFr-${faq?.id ?? "new"}`}>
                {dictionary.faqForm.questionFr}
              </Label>
              <Input id={`faq-questionFr-${faq?.id ?? "new"}`} {...form.register("questionFr")} />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor={`faq-answerAr-${faq?.id ?? "new"}`}>
                {dictionary.faqForm.answerAr}
              </Label>
              <Textarea id={`faq-answerAr-${faq?.id ?? "new"}`} {...form.register("answerAr")} />
            </div>
            <div>
              <Label htmlFor={`faq-answerFr-${faq?.id ?? "new"}`}>
                {dictionary.faqForm.answerFr}
              </Label>
              <Textarea id={`faq-answerFr-${faq?.id ?? "new"}`} {...form.register("answerFr")} />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <Label htmlFor={`faq-sort-${faq?.id ?? "new"}`}>{dictionary.common.sortOrder}</Label>
              <Input
                id={`faq-sort-${faq?.id ?? "new"}`}
                type="number"
                className="w-28"
                {...form.register("sortOrder", {valueAsNumber: true})}
              />
            </div>
            <label className="mt-7 flex items-center gap-3 text-sm text-sand-100/75">
              <Checkbox {...form.register("active")} />
              {dictionary.faqForm.active}
            </label>
          </div>
          {serverError ? <p className="text-sm text-red-300">{serverError}</p> : null}
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? "..."
              : mode === "create"
                ? dictionary.faqForm.create
                : dictionary.faqForm.save}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
