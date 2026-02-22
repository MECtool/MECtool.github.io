import Link from "next/link";

export default function LegalPage() {
  return (
    <main className="min-h-screen pb-8">
      <div className="mx-auto max-w-3xl px-4 pt-6 sm:pt-10">
        <Link
          href="/"
          className="inline-block mb-6 text-primary hover:underline text-sm font-semibold"
        >
          &larr; Back to Calculator
        </Link>

        <h1 className="mb-8 text-2xl font-bold text-primary sm:text-3xl">
          Legal Information
        </h1>

        {/* Disclaimer */}
        <section id="disclaimer" className="mb-10 scroll-mt-8">
          <h2 className="text-xl font-bold text-primary mb-3">Disclaimer</h2>
          <div className="space-y-3 text-sm text-text/80 leading-relaxed">
            <p>
              The information provided by the Morphine Equivalence Calculator is
              for general informational purposes only. It is not intended to be a
              substitute for professional medical advice, diagnosis, or
              treatment. Always seek the advice of your physician or other
              qualified health provider with any questions you may have regarding
              a medical condition or medication dosage.
            </p>
            <p>
              The conversion factors and calculations used in this tool are based
              on published clinical guidelines and pharmacological references.
              However, opioid equianalgesic ratios are approximations and can
              vary significantly based on individual patient factors, including
              but not limited to tolerance, cross-tolerance, organ function, age,
              and concurrent medications.
            </p>
            <p>
              Never disregard professional medical advice or delay in seeking it
              because of information obtained from this calculator. If you think
              you may have a medical emergency, call your doctor or emergency
              services immediately.
            </p>
            <p>
              The developers and maintainers of this tool assume no
              responsibility or liability for any errors or omissions in the
              content, or for any actions taken based on the information provided
              herein.
            </p>
          </div>
        </section>

        {/* Privacy Policy */}
        <section id="privacy" className="mb-10 scroll-mt-8">
          <h2 className="text-xl font-bold text-primary mb-3">
            Privacy Policy
          </h2>
          <div className="space-y-3 text-sm text-text/80 leading-relaxed">
            <p>
              This website collects no personal data from its users. All
              calculations are performed entirely within your browser, and no
              dosage or medication information is transmitted to any server.
            </p>
            <p>
              We may use anonymous analytics (such as page view counts) to
              understand general usage patterns and improve the tool. These
              analytics do not collect personally identifiable information.
            </p>
            <p>
              This site does not use cookies for tracking purposes. No user
              accounts are required, and no personal information is stored,
              shared, or sold to third parties.
            </p>
            <p>
              If you contact us via email, we may retain your correspondence to
              respond to your inquiry. We will not use your email address for
              marketing or share it with third parties.
            </p>
          </div>
        </section>

        {/* Terms of Use */}
        <section id="terms" className="mb-10 scroll-mt-8">
          <h2 className="text-xl font-bold text-primary mb-3">Terms of Use</h2>
          <div className="space-y-3 text-sm text-text/80 leading-relaxed">
            <p>
              By using this website, you agree to comply with and be bound by
              the following terms and conditions of use. If you disagree with any
              part of these terms, please do not use this tool.
            </p>
            <p>
              This tool is provided &ldquo;as is&rdquo; without warranties of
              any kind, either express or implied. We do not warrant that the
              tool will be uninterrupted, error-free, or free of harmful
              components.
            </p>
            <p>
              You acknowledge that this calculator is an aid for healthcare
              professionals and should not replace clinical judgment. You assume
              full responsibility for the use of this tool and any decisions made
              based on its output.
            </p>
            <p>
              We reserve the right to modify, update, or discontinue this tool
              at any time without prior notice. We are not liable for any damages
              arising from the use or inability to use this tool.
            </p>
            <p>
              The content of this website is protected by applicable intellectual
              property laws. You may use the tool for personal and professional
              clinical purposes but may not reproduce or distribute the tool for
              commercial gain without permission.
            </p>
          </div>
        </section>

        {/* Accessibility Statement */}
        <section id="accessibility" className="mb-10 scroll-mt-8">
          <h2 className="text-xl font-bold text-primary mb-3">
            Accessibility Statement
          </h2>
          <div className="space-y-3 text-sm text-text/80 leading-relaxed">
            <p>
              We are committed to ensuring digital accessibility for people with
              disabilities. We continually improve the user experience for
              everyone and apply the relevant accessibility standards.
            </p>
            <p>
              This website strives to conform to the Web Content Accessibility
              Guidelines (WCAG) 2.1, Level AA. These guidelines explain how to
              make web content more accessible to people with a wide range of
              disabilities.
            </p>
            <p>
              Measures we take to support accessibility include semantic HTML
              markup, sufficient color contrast, keyboard navigation support,
              descriptive labels for all form inputs, and a responsive design
              that works across devices and screen sizes.
            </p>
            <p>
              If you encounter any accessibility barriers while using this tool,
              or if you have suggestions for improvement, please contact us at{" "}
              <a
                href="mailto:MECConversion@gmail.com"
                className="text-primary hover:underline"
              >
                MECConversion@gmail.com
              </a>
              . We welcome your feedback and will make reasonable efforts to
              address any issues.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
