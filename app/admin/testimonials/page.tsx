import {DeleteItemButton} from "@/components/admin/delete-item-button";
import {TestimonialForm} from "@/components/admin/testimonial-form";
import {Card, CardContent} from "@/components/ui/card";
import {getAdminI18n} from "@/lib/admin-locale";
import {requireAdminSession} from "@/lib/auth/session";
import {getAdminTestimonials} from "@/lib/data/admin";

export default async function AdminTestimonialsPage() {
  await requireAdminSession();
  const {dictionary} = await getAdminI18n();
  const testimonials = await getAdminTestimonials();

  return (
    <div className="space-y-6">
      <div>
        <p className="font-display text-3xl text-sand-50">
          {dictionary.testimonialsPage.title}
        </p>
        <p className="text-sm text-sand-100/60">{dictionary.testimonialsPage.subtitle}</p>
      </div>

      <TestimonialForm mode="create" />

      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="space-y-3">
            <Card>
              <CardContent className="flex items-center justify-between gap-4 py-5">
                <div>
                  <p className="font-medium text-sand-50">{testimonial.name}</p>
                  <p className="text-xs text-sand-100/55">{testimonial.city}</p>
                </div>
                <DeleteItemButton
                  endpoint={`/api/admin/testimonials/${testimonial.id}`}
                  label={dictionary.common.delete}
                />
              </CardContent>
            </Card>
            <TestimonialForm mode="edit" testimonial={testimonial} />
          </div>
        ))}
      </div>
    </div>
  );
}
