import Header from "@/components/header";
import Footer from "@/components/footer";
import SEO from "@/components/seo";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO 
        title="Privacy Policy"
        description="Read Smart Deals AI's privacy policy to understand how we collect, use, and protect your personal information when using our deal discovery platform."
        keywords="privacy policy, data protection, personal information, Smart Deals AI"
      />
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8" data-testid="privacy-title">Privacy Policy</h1>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <p className="mb-4">
                  Smart Deals AI ("we," "our," or "us") collects information you provide directly to us, such as when you:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Use our search functionality</li>
                  <li>Contact us through our contact form</li>
                  <li>Subscribe to our updates</li>
                  <li>Interact with our affiliate links</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Provide and improve our AI-powered product recommendation service</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send you updates about deals and offers (with your consent)</li>
                  <li>Analyze usage patterns to improve our service</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
                <p className="mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties except:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>When you click on affiliate links (you will be redirected to the merchant's website)</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Affiliate Links</h2>
                <p className="mb-4">
                  Our website contains affiliate links to Amazon, Flipkart, Myntra, and other e-commerce platforms. 
                  When you click these links and make a purchase, we may earn a commission at no additional cost to you.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
                <p className="mb-4">
                  We use cookies and similar tracking technologies to improve your experience on our website. 
                  You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                <p className="mb-4">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <ul className="list-none mb-4">
                  <li>Email: afarenziya@gmail.com</li>
                  <li>Phone: +91 9315869313</li>
                  <li>Address: Noida, India</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new Privacy Policy on this page and updating the "Last updated" date.
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
