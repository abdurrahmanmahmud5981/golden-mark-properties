import { ContactForm } from "@/components/forms/ContactForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container px-4 py-20 flex flex-col lg:flex-row gap-16">
      {/* Contact Info */}
      <div className="lg:w-1/3 space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primary">যোগাযোগ করুন</h1>
          <p className="text-muted-foreground">যেকোনো প্রশ্ন বা বিস্তারিত জানতে সরাসরি যোগাযোগ করুন অথবা আপনার তথ্য দিয়ে মেসেজ পাঠান।</p>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-bold">ফোন করুন</h4>
              <p className="text-muted-foreground">+৮৮ ০১৬১৮ ১০১০১০</p>
              <p className="text-muted-foreground">+৮৮ ০১৭৮৯ ২০২০২০</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-bold">ইমেইল করুন</h4>
              <p className="text-muted-foreground">info@goldenmarkproperties.com</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-bold">অফিস ঠিকানা</h4>
              <p className="text-muted-foreground">মাতুয়াইল, ঢাকা-১৩৬২, বাংলাদেশ।</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-bold">অফিস চলাকালীন সময়</h4>
              <p className="text-muted-foreground">শনিবার - বৃহস্পতিবার: সকাল ১০টা - সন্ধ্যা ৬টা</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="lg:w-2/3">
        <ContactForm />
      </div>
    </div>
  );
}
