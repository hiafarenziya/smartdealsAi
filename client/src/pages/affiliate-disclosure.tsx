import Header from "@/components/header";
import Footer from "@/components/footer";

export default function AffiliateDisclosure() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8" data-testid="affiliate-title">Affiliate Disclosure</h1>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Affiliate Marketing Disclosure</h2>
                <p className="mb-4">
                  Smart Deals AI (iajaykumar.com) participates in affiliate marketing programs. This means that when you 
                  click on certain links on our website and make a purchase, we may earn a commission from the merchant 
                  at no additional cost to you.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Affiliate Partners</h2>
                <p className="mb-4">We are affiliated with the following e-commerce platforms:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Amazon India</li>
                  <li>Flipkart</li>
                  <li>Myntra</li>
                  <li>Other e-commerce platforms as disclosed on specific product pages</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">How Affiliate Links Work</h2>
                <p className="mb-4">
                  When you click on an affiliate link on our website, you are redirected to the merchant's website. 
                  If you make a purchase within a certain timeframe (usually 24-90 days, depending on the merchant), 
                  we may earn a small commission from that sale.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">No Additional Cost</h2>
                <p className="mb-4">
                  Using our affiliate links does not cost you anything extra. The price you pay is the same whether 
                  you use our affiliate link or go directly to the merchant's website. The commission we earn comes 
                  from the merchant's marketing budget.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Editorial Independence</h2>
                <p className="mb-4">
                  Our affiliate relationships do not influence our editorial content or product recommendations. 
                  We strive to provide honest, unbiased reviews and recommendations based on our AI analysis and 
                  genuine value to our users.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Identification of Affiliate Content</h2>
                <p className="mb-4">
                  We clearly identify affiliate content and links on our website. You'll typically see indicators such as:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>"Affiliate Link" labels</li>
                  <li>"View Deal" buttons that lead to merchant websites</li>
                  <li>This disclosure page</li>
                  <li>Platform badges on product cards</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Support Our Service</h2>
                <p className="mb-4">
                  By using our affiliate links when making purchases, you help support Smart Deals AI and allow us to 
                  continue providing free AI-powered deal discovery services to users across India.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Compliance with Indian Laws</h2>
                <p className="mb-4">
                  Our affiliate marketing practices comply with Indian advertising and consumer protection laws. 
                  We are committed to transparency and ethical marketing practices.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Privacy and Data</h2>
                <p className="mb-4">
                  When you click on affiliate links, some information may be shared with our affiliate partners 
                  for tracking purposes. This is covered in detail in our Privacy Policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Questions and Concerns</h2>
                <p className="mb-4">
                  If you have any questions about our affiliate relationships or this disclosure, please contact us:
                </p>
                <ul className="list-none mb-4">
                  <li>Email: afarenziya@gmail.com</li>
                  <li>Phone: +91 9315869313</li>
                  <li>Address: Noida, India</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Updates to This Disclosure</h2>
                <p>
                  We may update this disclosure from time to time to reflect changes in our affiliate partnerships 
                  or legal requirements. Please check this page periodically for updates.
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
