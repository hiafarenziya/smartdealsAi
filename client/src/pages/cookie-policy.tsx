import Header from "@/components/header";
import Footer from "@/components/footer";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8" data-testid="cookie-title">Cookie Policy</h1>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">What Are Cookies?</h2>
                <p className="mb-4">
                  Cookies are small text files that are stored on your device when you visit Smart Deals AI (iajaykumar.com). 
                  They help us provide you with a better browsing experience by remembering your preferences and improving 
                  our service functionality.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
                
                <h3 className="text-xl font-semibold mb-3">Essential Cookies</h3>
                <p className="mb-4">
                  These cookies are necessary for the website to function properly. They enable basic features like 
                  page navigation, access to secure areas, and form submissions. The website cannot function properly 
                  without these cookies.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Performance Cookies</h3>
                <p className="mb-4">
                  These cookies help us understand how visitors interact with our website by collecting anonymous 
                  information about page visits, time spent on pages, and any error messages encountered.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Functionality Cookies</h3>
                <p className="mb-4">
                  These cookies remember your preferences and settings to provide you with a more personalized 
                  experience, such as your preferred language, search filters, and product categories.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Targeting/Advertising Cookies</h3>
                <p className="mb-4">
                  These cookies are used to make advertising more relevant to you and your interests. They may be 
                  set by our advertising partners and affiliate networks to build a profile of your interests.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Specific Cookies We Use</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border border-border rounded-lg">
                    <thead className="bg-card">
                      <tr>
                        <th className="border border-border p-3 text-left">Cookie Name</th>
                        <th className="border border-border p-3 text-left">Purpose</th>
                        <th className="border border-border p-3 text-left">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border p-3">_session</td>
                        <td className="border border-border p-3">Maintains your session and preferences</td>
                        <td className="border border-border p-3">Session</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-3">user_preferences</td>
                        <td className="border border-border p-3">Remembers your search filters and settings</td>
                        <td className="border border-border p-3">30 days</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-3">analytics</td>
                        <td className="border border-border p-3">Helps us understand website usage patterns</td>
                        <td className="border border-border p-3">1 year</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-3">affiliate_tracking</td>
                        <td className="border border-border p-3">Tracks affiliate link clicks for commission</td>
                        <td className="border border-border p-3">90 days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
                <p className="mb-4">
                  Our website may also use third-party cookies from our partners and service providers:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li><strong>Amazon Associates:</strong> For affiliate link tracking and commission attribution</li>
                  <li><strong>Flipkart Affiliate:</strong> For tracking Flipkart affiliate transactions</li>
                  <li><strong>Myntra Partner:</strong> For Myntra affiliate program participation</li>
                  <li><strong>Google Analytics:</strong> For website traffic and user behavior analysis</li>
                  <li><strong>Social Media Platforms:</strong> For social sharing functionality</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
                <p className="mb-4">
                  You can control and manage cookies in several ways:
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Browser Settings</h3>
                <p className="mb-4">
                  Most web browsers allow you to control cookies through their settings. You can typically:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>View which cookies are stored on your device</li>
                  <li>Delete existing cookies</li>
                  <li>Block cookies from specific websites</li>
                  <li>Block all cookies</li>
                  <li>Set preferences for cookie acceptance</li>
                </ul>
                
                <h3 className="text-xl font-semibold mb-3">Cookie Preference Settings</h3>
                <p className="mb-4">
                  We provide cookie preference controls on our website where you can choose which types of 
                  cookies you want to allow. You can access these settings at any time to update your preferences.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Impact of Disabling Cookies</h2>
                <p className="mb-4">
                  While you can browse our website with cookies disabled, please note that:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Some features may not work properly</li>
                  <li>Your preferences will not be saved</li>
                  <li>Affiliate tracking may not function correctly</li>
                  <li>Personalized recommendations may not be available</li>
                  <li>Performance and functionality may be reduced</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Mobile Apps and Local Storage</h2>
                <p className="mb-4">
                  If we develop mobile applications in the future, they may use local storage and similar 
                  technologies instead of cookies. This policy will be updated to cover such technologies.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
                <p className="mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our practices, 
                  technology, or legal requirements. When we make changes, we will update the "Last updated" 
                  date at the top of this page.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                </p>
                <ul className="list-none mb-4">
                  <li>Email: afarenziya@gmail.com</li>
                  <li>Phone: +91 9315869313</li>
                  <li>Address: Noida, India</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Consent</h2>
                <p>
                  By continuing to use Smart Deals AI, you consent to our use of cookies as described in this policy. 
                  If you do not agree with our use of cookies, please adjust your browser settings or discontinue 
                  using our website.
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
