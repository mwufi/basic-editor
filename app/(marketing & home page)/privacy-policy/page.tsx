import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Privacy Policy for Wordy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            At Wordy, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines our practices concerning the collection, use, and protection of your data.
          </p>

          <h2 className="text-2xl font-semibold mb-2">1. Data Collection and Storage</h2>
          <p className="mb-4">
            We pride ourselves on minimizing data collection. Wordy is designed to respect your privacy:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>We do not store any personal data about you by default.</li>
            <li>The only information we collect is your username when you choose to log in.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-2">2. Use of Your Information</h2>
          <p className="mb-4">
            Your username is used solely for the purpose of identifying your account and providing you with a personalized experience within Wordy.
          </p>

          <h2 className="text-2xl font-semibold mb-2">3. Data Storage and Security</h2>
          <p className="mb-4">
            We are dedicated to keeping your information safe. To ensure the security of your data:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>We use Supabase and InstantDB, both reputable and secure platforms, to store note information.</li>
            <li>All data is encrypted in transit and at rest.</li>
            <li>We regularly update our security measures to protect against unauthorized access, alteration, disclosure, or destruction of data.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-2">4. Your Rights</h2>
          <p className="mb-4">
            You have the right to access, correct, or delete your personal information at any time. If you wish to exercise these rights or have any questions about our privacy practices, please contact us.
          </p>

          <h2 className="text-2xl font-semibold mb-2">5. Changes to This Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>

          <p className="mt-8">
            By using Wordy, you agree to the collection and use of information in accordance with this policy. Your trust is important to us, and we are committed to protecting your privacy and ensuring a secure user experience.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
