"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {Plus, Trash2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {
  Control,
  UseFormRegister,
  useFieldArray,
  useForm
} from "react-hook-form";
import {z} from "zod";

import {useAdminI18n} from "@/components/admin/admin-locale-provider";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {packageFormSchema} from "@/lib/validations/package";

type PackageFormValues = z.infer<typeof packageFormSchema>;

type PackageFormProps = {
  mode: "create" | "edit";
  initialValues: PackageFormValues;
  packageId?: string;
};

function SectionBox({
  title,
  children,
  action
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-2xl text-sand-50">{title}</h3>
          {action}
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

function RemoveButton({onClick}: {onClick: () => void}) {
  const {dictionary} = useAdminI18n();

  return (
    <Button type="button" variant="ghost" size="sm" onClick={onClick}>
      <Trash2 className="me-2 h-4 w-4" />
      {dictionary.common.remove}
    </Button>
  );
}

function PriceGroupEditor({
  index,
  control,
  register,
  removeGroup
}: {
  index: number;
  control: Control<PackageFormValues>;
  register: UseFormRegister<PackageFormValues>;
  removeGroup: () => void;
}) {
  const {dictionary} = useAdminI18n();
  const tiers = useFieldArray({
    control,
    name: `priceGroups.${index}.tiers` as const
  });

  return (
    <div className="space-y-4 rounded-[2rem] border border-gold-500/15 bg-noir-950/55 p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm uppercase tracking-[0.24em] text-gold-200/70">
          {dictionary.packageForm.priceGroup} {index + 1}
        </p>
        <RemoveButton onClick={removeGroup} />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <Label>{dictionary.packageForm.roomTypeAr}</Label>
          <Input {...register(`priceGroups.${index}.roomTypeAr` as const)} />
        </div>
        <div>
          <Label>{dictionary.packageForm.roomTypeFr}</Label>
          <Input {...register(`priceGroups.${index}.roomTypeFr` as const)} />
        </div>
        <div>
          <Label>{dictionary.common.sortOrder}</Label>
            <Input
              type="number"
              {...register(`priceGroups.${index}.sortOrder` as const, {
                valueAsNumber: true
              })}
            />
        </div>
      </div>
      <div className="space-y-4">
        {tiers.fields.map((tier, tierIndex) => (
          <div
            key={tier.id}
            className="grid gap-4 rounded-3xl border border-white/5 bg-white/5 p-4 md:grid-cols-4"
          >
            <div>
              <Label>{dictionary.packageForm.labelAr}</Label>
              <Input
                {...register(`priceGroups.${index}.tiers.${tierIndex}.labelAr` as const)}
              />
            </div>
            <div>
              <Label>{dictionary.packageForm.labelFr}</Label>
              <Input
                {...register(`priceGroups.${index}.tiers.${tierIndex}.labelFr` as const)}
              />
            </div>
            <div>
              <Label>{dictionary.packageForm.amountMad}</Label>
              <Input
                type="number"
                {...register(`priceGroups.${index}.tiers.${tierIndex}.amountMad` as const, {
                  valueAsNumber: true
                })}
              />
            </div>
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <Label>{dictionary.common.sortOrder}</Label>
                <Input
                  type="number"
                  {...register(`priceGroups.${index}.tiers.${tierIndex}.sortOrder` as const, {
                    valueAsNumber: true
                  })}
                />
              </div>
              <RemoveButton onClick={() => tiers.remove(tierIndex)} />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            tiers.append({
              labelAr: `الخيار ${tiers.fields.length + 1}`,
              labelFr: `Option ${tiers.fields.length + 1}`,
              amountMad: 0,
              sortOrder: tiers.fields.length
            })
          }
        >
          <Plus className="me-2 h-4 w-4" />
          {dictionary.packageForm.addTier}
        </Button>
      </div>
    </div>
  );
}

export function PackageForm({
  mode,
  initialValues,
  packageId
}: PackageFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {dictionary} = useAdminI18n();

  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: initialValues
  });

  const destinations = useFieldArray({
    control: form.control,
    name: "destinations"
  });
  const priceGroups = useFieldArray({
    control: form.control,
    name: "priceGroups"
  });
  const inclusions = useFieldArray({
    control: form.control,
    name: "inclusions"
  });
  const notes = useFieldArray({
    control: form.control,
    name: "notes"
  });
  const hotels = useFieldArray({
    control: form.control,
    name: "hotels"
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);
    const endpoint = mode === "create" ? "/api/admin/packages" : `/api/admin/packages/${packageId}`;
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
      setServerError(payload.error || dictionary.packageForm.unable);
      return;
    }

    router.push("/admin/packages");
    router.refresh();
  });

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <SectionBox
        title={mode === "create" ? dictionary.packageForm.titleCreate : dictionary.packageForm.titleEdit}
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <Label>{dictionary.packageForm.slug}</Label>
            <Input {...form.register("slug")} />
          </div>
          <div>
            <Label>{dictionary.packageForm.heroImage}</Label>
            <Input {...form.register("heroImage")} />
          </div>
          <div>
            <Label>{dictionary.packageForm.titleAr}</Label>
            <Input {...form.register("titleAr")} />
          </div>
          <div>
            <Label>{dictionary.packageForm.titleFr}</Label>
            <Input {...form.register("titleFr")} />
          </div>
          <div>
            <Label>{dictionary.packageForm.shortDescriptionAr}</Label>
            <Textarea {...form.register("shortDescriptionAr")} />
          </div>
          <div>
            <Label>{dictionary.packageForm.shortDescriptionFr}</Label>
            <Textarea {...form.register("shortDescriptionFr")} />
          </div>
          <div>
            <Label>{dictionary.packageForm.descriptionAr}</Label>
            <Textarea {...form.register("descriptionAr")} />
          </div>
          <div>
            <Label>{dictionary.packageForm.descriptionFr}</Label>
            <Textarea {...form.register("descriptionFr")} />
          </div>
          <div>
            <Label>{dictionary.packageForm.startDate}</Label>
            <Input type="date" {...form.register("startDate")} />
          </div>
          <div>
            <Label>{dictionary.packageForm.endDate}</Label>
            <Input type="date" {...form.register("endDate")} />
          </div>
          <div>
            <Label>{dictionary.packageForm.durationDays}</Label>
            <Input type="number" {...form.register("durationDays", {valueAsNumber: true})} />
          </div>
          <div>
            <Label>{dictionary.packageForm.countryAr}</Label>
            <Input {...form.register("countryAr")} />
          </div>
          <div>
            <Label>{dictionary.packageForm.countryFr}</Label>
            <Input {...form.register("countryFr")} />
          </div>
          <div>
            <Label>{dictionary.packageForm.originCityAr}</Label>
            <Input {...form.register("originCityAr")} />
          </div>
          <div>
            <Label>{dictionary.packageForm.originCityFr}</Label>
            <Input {...form.register("originCityFr")} />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <label className="flex items-center gap-3 text-sm text-sand-100/75">
            <Checkbox {...form.register("isDirectFlight")} />
            {dictionary.packageForm.directFlight}
          </label>
          <label className="flex items-center gap-3 text-sm text-sand-100/75">
            <Checkbox {...form.register("featured")} />
            {dictionary.packageForm.featuredPackage}
          </label>
          <label className="flex items-center gap-3 text-sm text-sand-100/75">
            <Checkbox {...form.register("active")} />
            {dictionary.packageForm.active}
          </label>
          <label className="flex items-center gap-3 text-sm text-sand-100/75">
            <Checkbox {...form.register("visaIncluded")} />
            {dictionary.packageForm.visaIncluded}
          </label>
        </div>
      </SectionBox>

      <SectionBox
        title={dictionary.packageForm.destinations}
        action={
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() =>
              destinations.append({
                nameAr: "",
                nameFr: "",
                airportCode: "",
                sortOrder: destinations.fields.length
              })
            }
          >
            <Plus className="me-2 h-4 w-4" />
            {dictionary.packageForm.addDestination}
          </Button>
        }
      >
        <div className="space-y-4">
          {destinations.fields.map((field, index) => (
            <div
              key={field.id}
              className="grid gap-4 rounded-[2rem] border border-white/5 bg-white/5 p-5 md:grid-cols-4"
            >
              <div>
                <Label>{dictionary.packageForm.destinationNameAr}</Label>
                <Input {...form.register(`destinations.${index}.nameAr` as const)} />
              </div>
              <div>
                <Label>{dictionary.packageForm.destinationNameFr}</Label>
                <Input {...form.register(`destinations.${index}.nameFr` as const)} />
              </div>
              <div>
                <Label>{dictionary.packageForm.airportCode}</Label>
                <Input {...form.register(`destinations.${index}.airportCode` as const)} />
              </div>
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <Label>{dictionary.common.sortOrder}</Label>
                  <Input
                    type="number"
                    {...form.register(`destinations.${index}.sortOrder` as const, {
                      valueAsNumber: true
                    })}
                  />
                </div>
                <RemoveButton onClick={() => destinations.remove(index)} />
              </div>
            </div>
          ))}
        </div>
      </SectionBox>

      <SectionBox
        title={dictionary.packageForm.pricingGroups}
        action={
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() =>
              priceGroups.append({
                roomTypeAr: "",
                roomTypeFr: "",
                sortOrder: priceGroups.fields.length,
                tiers: [
                  {
                    labelAr: "الخيار 1",
                    labelFr: "Option 1",
                    amountMad: 0,
                    sortOrder: 0
                  }
                ]
              })
            }
          >
            <Plus className="me-2 h-4 w-4" />
            {dictionary.packageForm.addPriceGroup}
          </Button>
        }
      >
        <div className="space-y-4">
          {priceGroups.fields.map((group, index) => (
            <PriceGroupEditor
              key={group.id}
              index={index}
              control={form.control}
              register={form.register}
              removeGroup={() => priceGroups.remove(index)}
            />
          ))}
        </div>
      </SectionBox>

      <SectionBox
        title={dictionary.packageForm.inclusions}
        action={
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() =>
              inclusions.append({
                textAr: "",
                textFr: "",
                sortOrder: inclusions.fields.length
              })
            }
          >
            <Plus className="me-2 h-4 w-4" />
            {dictionary.packageForm.addInclusion}
          </Button>
        }
      >
        <div className="space-y-4">
          {inclusions.fields.map((field, index) => (
            <div
              key={field.id}
              className="grid gap-4 rounded-[2rem] border border-white/5 bg-white/5 p-5 md:grid-cols-3"
            >
              <div>
                <Label>{dictionary.packageForm.textAr}</Label>
                <Input {...form.register(`inclusions.${index}.textAr` as const)} />
              </div>
              <div>
                <Label>{dictionary.packageForm.textFr}</Label>
                <Input {...form.register(`inclusions.${index}.textFr` as const)} />
              </div>
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <Label>{dictionary.common.sortOrder}</Label>
                  <Input
                    type="number"
                    {...form.register(`inclusions.${index}.sortOrder` as const, {
                      valueAsNumber: true
                    })}
                  />
                </div>
                <RemoveButton onClick={() => inclusions.remove(index)} />
              </div>
            </div>
          ))}
        </div>
      </SectionBox>

      <SectionBox
        title={dictionary.packageForm.notes}
        action={
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() =>
              notes.append({
                textAr: "",
                textFr: "",
                sortOrder: notes.fields.length
              })
            }
          >
            <Plus className="me-2 h-4 w-4" />
            {dictionary.packageForm.addNote}
          </Button>
        }
      >
        <div className="space-y-4">
          {notes.fields.map((field, index) => (
            <div
              key={field.id}
              className="grid gap-4 rounded-[2rem] border border-white/5 bg-white/5 p-5 md:grid-cols-3"
            >
              <div>
                <Label>{dictionary.packageForm.textAr}</Label>
                <Input {...form.register(`notes.${index}.textAr` as const)} />
              </div>
              <div>
                <Label>{dictionary.packageForm.textFr}</Label>
                <Input {...form.register(`notes.${index}.textFr` as const)} />
              </div>
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <Label>{dictionary.common.sortOrder}</Label>
                  <Input
                    type="number"
                    {...form.register(`notes.${index}.sortOrder` as const, {
                      valueAsNumber: true
                    })}
                  />
                </div>
                <RemoveButton onClick={() => notes.remove(index)} />
              </div>
            </div>
          ))}
        </div>
      </SectionBox>

      <SectionBox
        title={dictionary.packageForm.hotels}
        action={
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() =>
              hotels.append({
                name: "",
                city: "",
                stars: 4,
                descriptionAr: "",
                descriptionFr: "",
                sortOrder: hotels.fields.length
              })
            }
          >
            <Plus className="me-2 h-4 w-4" />
            {dictionary.packageForm.addHotel}
          </Button>
        }
      >
        <div className="space-y-4">
          {hotels.fields.map((field, index) => (
            <div
              key={field.id}
              className="grid gap-4 rounded-[2rem] border border-white/5 bg-white/5 p-5 md:grid-cols-3"
            >
              <div>
                <Label>{dictionary.packageForm.hotelName}</Label>
                <Input {...form.register(`hotels.${index}.name` as const)} />
              </div>
              <div>
                <Label>{dictionary.packageForm.hotelCity}</Label>
                <Input {...form.register(`hotels.${index}.city` as const)} />
              </div>
              <div>
                <Label>{dictionary.packageForm.stars}</Label>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  {...form.register(`hotels.${index}.stars` as const, {
                    valueAsNumber: true
                  })}
                />
              </div>
              <div>
                <Label>{dictionary.packageForm.descriptionAr}</Label>
                <Textarea {...form.register(`hotels.${index}.descriptionAr` as const)} />
              </div>
              <div>
                <Label>{dictionary.packageForm.descriptionFr}</Label>
                <Textarea {...form.register(`hotels.${index}.descriptionFr` as const)} />
              </div>
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <Label>{dictionary.common.sortOrder}</Label>
                  <Input
                    type="number"
                    {...form.register(`hotels.${index}.sortOrder` as const, {
                      valueAsNumber: true
                    })}
                  />
                </div>
                <RemoveButton onClick={() => hotels.remove(index)} />
              </div>
            </div>
          ))}
        </div>
      </SectionBox>

      {serverError ? <p className="text-sm text-red-300">{serverError}</p> : null}
      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting
            ? "..."
            : mode === "create"
              ? dictionary.packageForm.create
              : dictionary.packageForm.save}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/packages")}>
          {dictionary.common.cancel}
        </Button>
      </div>
    </form>
  );
}
