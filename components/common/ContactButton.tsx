'use client'
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { Mail, Send, User, MessageSquare, Briefcase, Heart, Star, Calendar } from "lucide-react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { createLead } from "@/app/actions/leads.actions";
import { toast } from "sonner";

interface ContactButtonProps {
    trigger?: React.ReactNode;
}

export default function ContactButton({ trigger }: ContactButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const t = useTranslations('about');

    const contactSchema = z.object({
        name: z.string()
            .min(2, t('cta.modal.validation.name.min'))
            .max(50, t('cta.modal.validation.name.max'))
            .regex(/^[a-zA-Z\s]+$/, t('cta.modal.validation.name.format')),

        email: z.string()
            .email(t('cta.modal.validation.email.invalid'))
            .min(1, t('cta.modal.validation.email.required')),

        company: z.string()
            .min(1, t('cta.modal.validation.company.required'))
            .max(100, t('cta.modal.validation.company.max')),

        projectType: z.enum(
            [
                "WEB_DEVELOPMENT",
                "MOBILE_APP",
                "E_COMMERCE",
                "SAAS_PLATFORM",
                "PORTFOLIO",
                "CONSULTING",
                "OTHER",
            ] as const,
            {
                message: t('cta.modal.validation.projectType.required'),
            }
        ),

        budget: z.enum(
            [
                "UNDER_5K",
                "RANGE_5K_15K",
                "RANGE_15K_30K",
                "RANGE_30K_50K",
                "OVER_50K",
            ] as const,
            {
                message: t('cta.modal.validation.budget.required'),
            }
        ),

        timeline: z.enum(
            [
                "ASAP",
                "ONE_MONTH",
                "ONE_TO_THREE_MONTHS",
                "THREE_TO_SIX_MONTHS",
                "OVER_SIX_MONTHS",
            ] as const,
            {
                message: t('cta.modal.validation.timeline.required'),
            }
        ),

        priority: z.enum(
            [
                "DESIGN",
                "PERFORMANCE",
                "FUNCTIONALITY",
                "SEO",
                "USER_EXPERIENCE",
            ] as const,
            {
                message: t('cta.modal.validation.priority.required'),
            }
        ),

        message: z.string()
            .min(20, t('cta.modal.validation.message.min'))
            .max(1000, t('cta.modal.validation.message.max')),

        contactPreference: z.enum(["EMAIL", "PHONE", "VIDEO_CALL"] as const, {
            message: t('cta.modal.validation.contactPreference.required'),
        })
    });

    type ContactFormData = z.infer<typeof contactSchema>;

    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            company: "",
            message: "",
        }
    });

    const onSubmit = async (data: ContactFormData) => {
        const toastId = toast.loading(t('cta.modal.message.contact.sending'));
        setIsSubmitting(true);

        // Simulate API call
        const { success, error } = await createLead(data);

        if (!success) {
            toast.error(error || t('cta.modal.message.contact.error'), { id: toastId });
            return;
        }

        toast.success(t('cta.modal.message.contact.success'), { id: toastId });

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setIsSubmitted(false);
            setIsOpen(false);
            form.reset();
        }, 3000);
    };

    const projectTypes = [
        { value: "WEB_DEVELOPMENT", label: t('cta.modal.project.type.options.web-development'), icon: "🌐" },
        { value: "MOBILE_APP", label: t('cta.modal.project.type.options.mobile-app'), icon: "📱" },
        { value: "E_COMMERCE", label: t('cta.modal.project.type.options.e-commerce'), icon: "🛒" },
        { value: "SAAS_PLATFORM", label: t('cta.modal.project.type.options.saas-platform'), icon: "☁️" },
        { value: "PORTFOLIO", label: t('cta.modal.project.type.options.portfolio'), icon: "🎨" },
        { value: "CONSULTING", label: t('cta.modal.project.type.options.consulting'), icon: "💡" },
        { value: "OTHER", label: t('cta.modal.project.type.options.other'), icon: "🔧" }
    ] as const;

    const budgetRanges = [
        { value: "UNDER_5K", label: t('cta.modal.project.budget.options.under-5k'), color: "bg-blue-100 text-blue-800" },
        { value: "RANGE_5K_15K", label: t('cta.modal.project.budget.options.5k-15k'), color: "bg-green-100 text-green-800" },
        { value: "RANGE_15K_30K", label: t('cta.modal.project.budget.options.15k-30k'), color: "bg-yellow-100 text-yellow-800" },
        { value: "RANGE_30K_50K", label: t('cta.modal.project.budget.options.30k-50k'), color: "bg-orange-100 text-orange-800" },
        { value: "OVER_50K", label: t('cta.modal.project.budget.options.50k+'), color: "bg-purple-100 text-purple-800" }
    ] as const;

    const priorities = [
        { value: "DESIGN", label: t('cta.modal.project.priority.options.design'), icon: <Heart className="w-4 h-4" /> },
        { value: "PERFORMANCE", label: t('cta.modal.project.priority.options.performance'), icon: <Star className="w-4 h-4" /> },
        { value: "FUNCTIONALITY", label: t('cta.modal.project.priority.options.functionality'), icon: <Briefcase className="w-4 h-4" /> },
        { value: "SEO", label: t('cta.modal.project.priority.options.seo'), icon: <MessageSquare className="w-4 h-4" /> },
        { value: "USER_EXPERIENCE", label: t('cta.modal.project.priority.options.user-experience'), icon: <User className="w-4 h-4" /> }
    ] as const;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {
                    trigger ? <div>{trigger}</div> : (
                        <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                            <Mail className="w-5 h-5 mr-2" />
                            {t('cta.contact')}
                        </Button>
                    )
                }
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto !w-[95vw] !max-w-[900px]">
                <DialogHeader className="space-y-4">
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {t('cta.modal.title')}
                    </DialogTitle>
                    <p className="text-muted-foreground">
                        {t('cta.modal.description')}
                    </p>
                </DialogHeader>

                {isSubmitted ? (
                    <div className="text-center py-8 space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <Send className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-green-600">{t('cta.modal.success.title')}</h3>
                        <p className="text-muted-foreground">
                            {t('cta.modal.success.description')}
                        </p>
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/* Personal Information */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <User className="w-5 h-5 text-primary" />
                                    <h3 className="text-lg font-semibold">{t('cta.modal.personal.title')}</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('cta.modal.personal.name.label')}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={t('cta.modal.personal.name.placeholder')} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('cta.modal.personal.email.label')}</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder={t('cta.modal.personal.email.placeholder')} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="company"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('cta.modal.personal.company.label')}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t('cta.modal.personal.company.placeholder')} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Separator />

                            {/* Project Details */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-primary" />
                                    <h3 className="text-lg font-semibold">{t('cta.modal.project.title')}</h3>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="projectType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('cta.modal.project.type.label')}</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={t('cta.modal.project.type.placeholder')} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {projectTypes.map((type) => (
                                                        <SelectItem key={type.value} value={type.value}>
                                                            <span className="flex items-center gap-2">
                                                                <span>{type.icon}</span>
                                                                {type.label}
                                                            </span>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="budget"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('cta.modal.project.budget.label')}</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        className="space-y-2"
                                                    >
                                                        {budgetRanges.map((budget) => (
                                                            <div key={budget.value} className="flex items-center space-x-2">
                                                                <RadioGroupItem value={budget.value} id={budget.value} />
                                                                <Label htmlFor={budget.value} className="flex-1">
                                                                    <Badge variant="secondary" className={budget.color}>
                                                                        {budget.label}
                                                                    </Badge>
                                                                </Label>
                                                            </div>
                                                        ))}
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="timeline"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('cta.modal.project.timeline.label')}</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder={t('cta.modal.project.timeline.placeholder')} />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="ASAP">{t('cta.modal.project.timeline.asap')}</SelectItem>
                                                        <SelectItem value="ONE_MONTH">{t('cta.modal.project.timeline.1-month')}</SelectItem>
                                                        <SelectItem value="ONE_TO_THREE_MONTHS">{t('cta.modal.project.timeline.1-3-months')}</SelectItem>
                                                        <SelectItem value="THREE_TO_SIX_MONTHS">{t('cta.modal.project.timeline.3-6-months')}</SelectItem>
                                                        <SelectItem value="OVER_SIX_MONTHS">{t('cta.modal.project.timeline.6-months+')}</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="priority"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('cta.modal.project.priority.label')}</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="grid grid-cols-2 md:grid-cols-3 gap-4"
                                                >
                                                    {priorities.map((priority) => (
                                                        <div key={priority.value} className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                                                            <RadioGroupItem value={priority.value} id={priority.value} />
                                                            <Label htmlFor={priority.value} className="flex items-center gap-2 cursor-pointer">
                                                                {priority.icon}
                                                                {priority.label}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Separator />

                            {/* Message & Contact Preference */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-primary" />
                                    <h3 className="text-lg font-semibold">{t('cta.modal.message.title')}</h3>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('cta.modal.message.description.label')}</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder={t('cta.modal.message.description.placeholder')}
                                                    className="min-h-[120px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="contactPreference"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('cta.modal.message.contact.label')}</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex flex-col sm:flex-row gap-4"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="EMAIL" id="EMAIL" />
                                                        <Label htmlFor="EMAIL" className="flex items-center gap-2">
                                                            <Mail className="w-4 h-4" />
                                                            {t('cta.modal.message.contact.email')}
                                                        </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="PHONE" id="PHONE" />
                                                        <Label htmlFor="PHONE" className="flex items-center gap-2">
                                                            <MessageSquare className="w-4 h-4" />
                                                            {t('cta.modal.message.contact.phone')}
                                                        </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="VIDEO_CALL" id="VIDEO_CALL" />
                                                        <Label htmlFor="VIDEO_CALL" className="flex items-center gap-2">
                                                            <Calendar className="w-4 h-4" />
                                                            {t('cta.modal.message.contact.video')}
                                                        </Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            {t('cta.modal.message.contact.sending')}
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Send className="w-4 h-4" />
                                            {t('cta.modal.message.contact.send')}
                                        </div>
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsOpen(false)}
                                    disabled={isSubmitting}
                                    className="flex-1 sm:flex-none"
                                >
                                    {t('cta.modal.message.contact.cancel')}
                                </Button>
                            </div>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    );
}
