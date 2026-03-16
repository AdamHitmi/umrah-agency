import {DeleteItemButton} from "@/components/admin/delete-item-button";
import {FaqForm} from "@/components/admin/faq-form";
import {Card, CardContent} from "@/components/ui/card";
import {getAdminI18n} from "@/lib/admin-locale";
import {requireAdminSession} from "@/lib/auth/session";
import {getAdminFaqs} from "@/lib/data/admin";

export default async function AdminFaqsPage() {
  await requireAdminSession();
  const {dictionary} = await getAdminI18n();
  const faqs = await getAdminFaqs();

  return (
    <div className="space-y-6">
      <div>
        <p className="font-display text-3xl text-sand-50">{dictionary.faqsPage.title}</p>
        <p className="text-sm text-sand-100/60">{dictionary.faqsPage.subtitle}</p>
      </div>

      <FaqForm mode="create" />

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="space-y-3">
            <Card>
              <CardContent className="flex items-center justify-between gap-4 py-5">
                <div>
                  <p className="font-medium text-sand-50">{faq.questionAr}</p>
                  <p className="text-xs text-sand-100/55">{faq.questionFr}</p>
                </div>
                <DeleteItemButton
                  endpoint={`/api/admin/faqs/${faq.id}`}
                  label={dictionary.common.delete}
                />
              </CardContent>
            </Card>
            <FaqForm mode="edit" faq={faq} />
          </div>
        ))}
      </div>
    </div>
  );
}
