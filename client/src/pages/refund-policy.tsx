import Header from "@/components/header";
import Footer from "@/components/footer";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8" data-testid="refund-title">Refund Policy</h1>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Service Overview</h2>
                <p className="mb-4">
                  Smart Deals AI (iajaykumar.com) is a free AI-powered product discovery platform that helps users 
                  find deals and discounts from various e-commerce platforms. We do not sell products directly or 
                  process payments for merchandise.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">No Direct Sales</h2>
                <p className="mb-4">
                  Since we do not sell products directly to consumers, traditional refund policies do not apply to 
                  our service. When you make a purchase through our affiliate links, you are buying directly from 
                  the merchant (Amazon, Flipkart, Myntra, etc.).
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Merchant Refund Policies</h2>
                <p className="mb-4">
                  For any refunds, returns, or exchanges related to products purchased through our affiliate links, 
                  you must follow the refund policy of the respective merchant:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li><strong>Amazon India:</strong> Follow Amazon's return and refund policy</li>
                  <li><strong>Flipkart:</strong> Follow Flipkart's return and refund policy</li>
                  <li><strong>Myntra:</strong> Follow Myntra's return and refund policy</li>
                  <li><strong>Other merchants:</strong> Refer to their specific policies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Our Role in Disputes</h2>
                <p className="mb-4">
                  While we cannot process refunds for products purchased from merchants, we can assist you by:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Providing merchant contact information</li>
                  <li>Helping you understand the merchant's return policy</li>
                  <li>Mediating communication if necessary</li>
                  <li>Reporting persistent issues with specific merchants</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Premium Services (If Applicable)</h2>
                <p className="mb-4">
                  If we offer any premium or paid services in the future, the following refund policy would apply:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>30-day money-back guarantee for premium subscriptions</li>
                  <li>Refunds processed within 7-10 business days</li>
                  <li>Refunds issued to the original payment method</li>
                  <li>Pro-rated refunds for partial usage periods</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Technical Issues</h2>
                <p className="mb-4">
                  If you experience technical issues with our service that prevent you from accessing deals or 
                  information, please contact us immediately. We will work to resolve the issue promptly.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Incorrect Information</h2>
                <p className="mb-4">
                  If you make a purchase based on incorrect pricing or product information displayed on our platform, 
                  we will:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Help you contact the merchant to resolve the issue</li>
                  <li>Update our information to prevent future occurrences</li>
                  <li>Assist in finding alternative deals if available</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">How to Request Assistance</h2>
                <p className="mb-4">
                  If you need help with a purchase made through our platform, please contact us with:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Order details and merchant name</li>
                  <li>Description of the issue</li>
                  <li>Any relevant screenshots or documentation</li>
                  <li>Your preferred resolution</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <p className="mb-4">
                  For assistance with any purchase-related issues, please contact us:
                </p>
                <ul className="list-none mb-4">
                  <li>Email: afarenziya@gmail.com</li>
                  <li>Phone: +91 9315869313</li>
                  <li>Address: Noida, India</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Response Time</h2>
                <p className="mb-4">
                  We strive to respond to all refund-related inquiries within 24-48 hours. Complex cases may 
                  require additional time for investigation and resolution.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Policy Updates</h2>
                <p>
                  This refund policy may be updated from time to time to reflect changes in our services or 
                  legal requirements. Please check this page periodically for updates.
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
