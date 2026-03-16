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
import {testimonialSchema} from "@/lib/validations/testimonial";

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

type TestimonialFormProps = {
  mode: "create" | "edit";
  testimonial?: TestimonialFormValues & {id?: string};
};

const defaultValues: TestimonialFormValues = {
  name: "",
  city: "",
  rating: 5,
  contentAr: "",
  contentFr: "",
  active: true,
  sortOrder: 0
};

export function TestimonialForm({mode, testimonial}: TestimonialFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {dictionary} = useAdminI18n();
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: testimonial ?? defaultValues
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);
    const endpoint =
      mode === "create"
        ? "/api/admin/testimonials"
        : `/api/admin/testimonials/${testimonial?.id}`;
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
      setServerError(payload.error || dictionary.testimonialForm.unable);
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
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor={`testimonial-name-${testimonial?.id ?? "new"}`}>
                {dictionary.testimonialForm.name}
              </Label>
              <Input id={`testimonial-name-${testimonial?.id ?? "new"}`} {...form.register("name")} />
            </div>
            <div>
              <Label htmlFor={`testimonial-city-${testimonial?.id ?? "new"}`}>
                {dictionary.testimonialForm.city}
              </Label>
              <Input id={`testimonial-city-${testimonial?.id ?? "new"}`} {...form.register("city")} />
            </div>
            <div>
              <Label htmlFor={`testimonial-rating-${testimonial?.id ?? "new"}`}>
                {dictionary.testimonialForm.rating}
              </Label>
              <Input
                id={`testimonial-rating-${testimonial?.id ?? "new"}`}
                type="number"
                min={1}
                max={5}
                {...form.register("rating", {valueAsNumber: true})}
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor={`testimonial-ar-${testimonial?.id ?? "new"}`}>
                {dictionary.testimonialForm.contentAr}
              </Label>
              <Textarea id={`testimonial-ar-${testimonial?.id ?? "new"}`} {...form.register("contentAr")} />
            </div>
            <div>
              <Label htmlFor={`testimonial-fr-${testimonial?.id ?? "new"}`}>
                {dictionary.testimonialForm.contentFr}
              </Label>
              <Textarea id={`testimonial-fr-${testimonial?.id ?? "new"}`} {...form.register("contentFr")} />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <Label htmlFor={`testimonial-sort-${testimonial?.id ?? "new"}`}>
                {dictionary.common.sortOrder}
              </Label>
              <Input
                id={`testimonial-sort-${testimonial?.id ?? "new"}`}
                type="number"
                className="w-28"
                {...form.register("sortOrder", {valueAsNumber: true})}
              />
            </div>
            <label className="mt-7 flex items-center gap-3 text-sm text-sand-100/75">
              <Checkbox {...form.register("active")} />
              {dictionary.testimonialForm.active}
            </label>
          </div>
          {serverError ? <p className="text-sm text-red-300">{serverError}</p> : null}
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? "..."
              : mode === "create"
                ? dictionary.testimonialForm.create
                : dictionary.testimonialForm.save}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
