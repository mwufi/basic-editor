import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Terms of Service for Wordy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Last updated: June 19, 2024</p>

          <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By using Wordy, you agree to these Terms of Service. If you don't agree, please don't use our service.
          </p>

          <h2 className="text-2xl font-semibold mb-2">2. Description of Service</h2>
          <p className="mb-4">
            Wordy is a note-taking application designed to respect your privacy and provide a secure user experience.
          </p>

          <h2 className="text-2xl font-semibold mb-2">3. User Responsibilities</h2>
          <p className="mb-4">
            You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
          </p>

          <h2 className="text-2xl font-semibold mb-2">4. Privacy and Data Protection</h2>
          <p className="mb-4">
            We collect minimal data and prioritize your privacy. Please refer to our Privacy Policy for more details.
          </p>

          <h2 className="text-2xl font-semibold mb-2">5. Intellectual Property</h2>
          <p className="mb-4">
            Wordy and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>

          <h2 className="text-2xl font-semibold mb-2">6. Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your account at our sole discretion, without prior notice or liability.
          </p>

          <h2 className="text-2xl font-semibold mb-2">7. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page.
          </p>

          <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us.
          </p>

          <p className="mt-8">
            By using Wordy, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
