import Header from "@/components/header";
import Footer from "@/components/footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8" data-testid="terms-title">Terms of Service</h1>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
                <p className="mb-4">
                  By accessing and using Smart Deals AI (iajaykumar.com), you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Description of Service</h2>
                <p className="mb-4">
                  Smart Deals AI is an AI-powered affiliate marketing platform that helps users discover deals and 
                  discounts from various e-commerce platforms including Amazon, Flipkart, and Myntra.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
                <p className="mb-4">As a user of our service, you agree to:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Use the service only for lawful purposes</li>
                  <li>Not interfere with or disrupt the service</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                  <li>Provide accurate information when contacting us</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Affiliate Relationships</h2>
                <p className="mb-4">
                  We participate in affiliate programs with various e-commerce platforms. When you click on affiliate 
                  links and make purchases, we may earn a commission. This does not affect the price you pay.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Accuracy of Information</h2>
                <p className="mb-4">
                  While we strive to provide accurate product information and pricing, we cannot guarantee the accuracy 
                  of all information displayed. Prices and availability are subject to change without notice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
                <p className="mb-4">
                  Smart Deals AI shall not be liable for any direct, indirect, incidental, special, or consequential 
                  damages resulting from the use or inability to use our service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
                <p className="mb-4">
                  The content, design, and functionality of Smart Deals AI are protected by intellectual property laws. 
                  You may not reproduce, distribute, or create derivative works without our written permission.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Termination</h2>
                <p className="mb-4">
                  We reserve the right to terminate or suspend access to our service immediately, without prior notice, 
                  for any breach of these Terms of Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
                <p className="mb-4">
                  These terms shall be governed by and construed in accordance with the laws of India, 
                  and any disputes shall be subject to the jurisdiction of Indian courts.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <p className="mb-4">
                  For questions about these Terms of Service, please contact us at:
                </p>
                <ul className="list-none mb-4">
                  <li>Email: afarenziya@gmail.com</li>
                  <li>Phone: +91 9315869313</li>
                  <li>Address: Noida, India</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective immediately 
                  upon posting. Your continued use of the service constitutes acceptance of the modified terms.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
