import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { ArrowRight, CalendarIcon, Loader2, Play } from "lucide-react";
import { toast } from "sonner";
import appointmentBg from "@/assets/appointment-bg.jpg";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TermsDialog } from "@/components/shared/TermsDialog";
import {
  VIDEO_URL,
  clinic,
  departments,
  doctorsByDepartment,
  type Department,
} from "@/data/clinic";
import { BOOKING_EVENT } from "@/lib/booking";
import { isSunday, slotsForDate } from "@/lib/schedule";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { viewport } from "@/lib/motion";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email."),
  phone: z
    .string()
    .refine((v) => /^(\+92|0)?3\d{9}$/.test(v.replace(/[\s-]/g, "")), "Enter a valid PK number."),
  time: z.string().min(1, "Pick a time slot."),
  department: z.string().min(1),
  doctor: z.string().min(1, "Choose a doctor."),
  message: z.string().min(10, "Tell us a little more (10+ characters)."),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept the terms." }) }),
});

type FormValues = z.infer<typeof schema>;

const fieldClass =
  "h-12 w-full rounded-lg border border-border bg-background px-4 text-base text-navy focus:ring-2 focus:ring-primary/30 focus:outline-none";

export function Appointment() {
  const [date, setDate] = useState<Date | undefined>();
  const [dateError, setDateError] = useState("");
  const [videoOpen, setVideoOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { department: departments[0], doctor: "", consent: false as unknown as true },
  });

  const department = watch("department") as Department;
  const slots = slotsForDate(date);

  useEffect(() => {
    const handler = (e: Event) => {
      const dep = (e as CustomEvent<Department>).detail;
      setValue("department", dep);
      setValue("doctor", "");
    };
    window.addEventListener(BOOKING_EVENT, handler);
    return () => window.removeEventListener(BOOKING_EVENT, handler);
  }, [setValue]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 60);

  const onSubmit = async (values: FormValues) => {
    if (!date) {
      setDateError("Please choose a date.");
      return;
    }
    setDateError("");
    setSubmitting(true);
    const url = buildWhatsAppUrl({
      name: values.name,
      phone: values.phone,
      email: values.email,
      dateTime: `${format(date, "eee, d MMM yyyy")} at ${values.time}`,
      department: values.department,
      doctor: values.doctor,
      message: values.message,
    });
    // TODO(client): swap this for an API route if bookings should be stored.
    window.open(url, "_blank", "noopener");
    toast.success("Appointment request ready — continue in WhatsApp.");
    reset({ department: departments[0], doctor: "", consent: false as unknown as true });
    setDate(undefined);
    setSubmitting(false);
  };

  return (
    <section id="appointment" className="bg-background pb-16 md:pb-24">
      <div className="relative h-[300px] overflow-hidden lg:h-[440px]">
        <motion.img
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={viewport}
          transition={{ duration: 1.4 }}
          src={appointmentBg}
          alt="Dentist working in the clinic"
          loading="lazy"
          width={1600}
          height={912}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/35" />
        {VIDEO_URL && (
          <button
            type="button"
            aria-label="Play clinic tour video"
            onClick={() => setVideoOpen(true)}
            className="absolute top-1/2 left-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-white/50" />
            <Play className="relative h-7 w-7 fill-current" />
          </button>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.7 }}
        className="container-page"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative z-10 mx-auto -mt-24 max-w-[860px] rounded-2xl bg-card p-6 shadow-float sm:p-8 lg:-mt-40 lg:p-12"
        >
          <p className="eyebrow text-center">Get Appointment</p>
          <h2 className="h2-section mt-3 text-center">Get Doctor Appointment</h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-navy" htmlFor="name">
                Full Name <span className="text-primary">*</span>
              </label>
              <input id="name" className={fieldClass} {...register("name")} />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-navy" htmlFor="email">
                Email <span className="text-primary">*</span>
              </label>
              <input id="email" type="email" className={fieldClass} {...register("email")} />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-navy" htmlFor="phone">
                Phone <span className="text-primary">*</span>
              </label>
              <input id="phone" inputMode="tel" className={fieldClass} {...register("phone")} />
              {errors.phone && (
                <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-navy">
                Date &amp; Time <span className="text-primary">*</span>
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={`${fieldClass} flex items-center justify-between text-left`}
                  >
                    {date ? format(date, "d MMM yyyy") : "Select date"}
                    <CalendarIcon className="h-4 w-4 text-primary" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => {
                      setDate(d);
                      setValue("time", "");
                      setDateError("");
                    }}
                    disabled={(d) => d < today || d > maxDate || isSunday(d)}
                  />
                </PopoverContent>
              </Popover>
              {dateError && <p className="mt-1 text-xs text-destructive">{dateError}</p>}
              <select
                className={`${fieldClass} mt-3`}
                disabled={!date}
                {...register("time")}
                aria-label="Time slot"
              >
                <option value="">{date ? "Select time" : "Pick a date first"}</option>
                {slots.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.time && <p className="mt-1 text-xs text-destructive">{errors.time.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-navy" htmlFor="department">
                Department
              </label>
              <select
                id="department"
                className={fieldClass}
                {...register("department", { onChange: () => setValue("doctor", "") })}
              >
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-navy" htmlFor="doctor">
                Doctors <span className="text-primary">*</span>
              </label>
              <select id="doctor" className={fieldClass} {...register("doctor")}>
                <option value="">Select doctor</option>
                {(doctorsByDepartment[department] ?? []).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {errors.doctor && (
                <p className="mt-1 text-xs text-destructive">{errors.doctor.message}</p>
              )}
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-navy" htmlFor="message">
              Message <span className="text-primary">*</span>
            </label>
            <textarea
              id="message"
              className="min-h-32 w-full rounded-lg border border-border bg-background p-4 text-base text-navy focus:ring-2 focus:ring-primary/30 focus:outline-none"
              {...register("message")}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
            )}
          </div>

          <div className="mt-6 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="consent"
                checked={watch("consent") as unknown as boolean}
                onCheckedChange={(v) => setValue("consent", (v === true) as true)}
              />
              <label htmlFor="consent" className="text-sm text-muted-foreground">
                I have read &amp; accepted{" "}
                <TermsDialog
                  trigger={
                    <button type="button" className="font-semibold text-primary underline">
                      Terms &amp; Conditions
                    </button>
                  }
                />
                .
              </label>
            </div>
            {errors.consent && <p className="text-xs text-destructive">{errors.consent.message}</p>}

            <motion.button
              type="submit"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              disabled={submitting}
              className="group mt-3 flex h-12 items-center gap-3 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark disabled:opacity-70"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Now"}
              {!submitting && (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-[3px]" />
              )}
            </motion.button>

            <p className="mt-2 text-xs text-muted-foreground">
              Prefer to book online?{" "}
              <a
                href={clinic.booking.oladoc}
                target="_blank"
                rel="noreferrer"
                className="text-primary underline"
              >
                Oladoc
              </a>{" "}
              ·{" "}
              <a
                href={clinic.booking.marham}
                target="_blank"
                rel="noreferrer"
                className="text-primary underline"
              >
                Marham
              </a>
            </p>
          </div>
        </form>
      </motion.div>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Clinic tour</DialogTitle>
          </DialogHeader>
          {VIDEO_URL && (
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                src={VIDEO_URL}
                title="Clinic tour"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
