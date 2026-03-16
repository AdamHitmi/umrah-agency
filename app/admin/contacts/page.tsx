import {Card, CardContent} from "@/components/ui/card";
import {Table, TableCell, TableHead} from "@/components/ui/table";
import {getAdminI18n} from "@/lib/admin-locale";
import {requireAdminSession} from "@/lib/auth/session";
import {getAdminContacts} from "@/lib/data/admin";

export default async function AdminContactsPage() {
  await requireAdminSession();
  const {dictionary} = await getAdminI18n();
  const contacts = await getAdminContacts();

  return (
    <Card>
      <CardContent className="space-y-5">
        <div>
          <p className="font-display text-3xl text-sand-50">{dictionary.contactsPage.title}</p>
          <p className="text-sm text-sand-100/60">{dictionary.contactsPage.subtitle}</p>
        </div>
        <Table>
          <thead>
            <tr>
              <TableHead>{dictionary.contactsPage.nameColumn}</TableHead>
              <TableHead>{dictionary.contactsPage.subjectColumn}</TableHead>
              <TableHead>{dictionary.contactsPage.phoneColumn}</TableHead>
              <TableHead>{dictionary.contactsPage.messageColumn}</TableHead>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-sand-50">{contact.fullName}</p>
                    <p className="text-xs text-sand-100/55">{contact.email}</p>
                  </div>
                </TableCell>
                <TableCell>{contact.subject}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.message}</TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardContent>
    </Card>
  );
}
