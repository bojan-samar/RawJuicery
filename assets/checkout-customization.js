(function($) {
  $(document).on("page:load", function() {
    
    // Create Shipaid element
    const shipaid = document.createElement('shipaid-widget');
    shipaid.setAttribute('disablePolling', true)
    
    // Create p tag to adjust widget title
    const text = document.createElement('p');
    text.setAttribute("slot", "title");
    text.innerText = "Shipping Assurance";
    
    // Add p tag inside shipaid element
    shipaid.appendChild(text);

    // Grab header element to checkout step
    const header = document.querySelector('#main-header')

    // Grab ShipAid element and add to checkout
    if (window.innerWidth <= 768) {
      // If we are on mobile, then add to above the footer
      const footerEl = document.querySelector('[data-step-footer]')
      if (footerEl) footerEl.before(shipaid)
    } else if (header.innerText === "Shipping method"){
      // Otherwise, add when on Shipping step
      const summaryEl = document.querySelector('[data-step-footer]')
      if(summaryEl) summaryEl.after(shipaid)
    }

    document.addEventListener('shipaid-protection-status', async ({ detail }) => {
      try {
        // We need to re-fetch the checkout HTML
        const response = await fetch(window.location.href)

        // Get our HTML content as a string
        const text = await response.text()

        // If something went wrong, throw any error page we may have
        if (!response.ok) throw new Error(text)

        // Create a new parser that we'll use to convert our string to an HTML document
        const parser = new DOMParser()

        // Parse our string to create an HTML document
        const newCheckoutDocument = parser.parseFromString(text, 'text/html')

        // We will search for sections that have an `order-summary-section` data attribute, and replace those (i.e. the summary item list, and summary totals section)
        const summarySectionsSearchString = `[data-order-summary-section]`

        // Find all matching sections in our current checkout
        const summarySectionsToReplace = document.querySelectorAll(summarySectionsSearchString)
        
        // Loop over each, find the matching element in our new checkout HTML, and replace.
        summarySectionsToReplace.forEach(section => {
          // Get the name of the current section
          const name = section.dataset.orderSummarySection
          if (!name) return

          // Find the matching section in our new HTML, using the data attr name above
          const matchingNewSection = newCheckoutDocument.querySelector(`[data-order-summary-section="${name}"]`)
          // If we have a matching new section, then replace the current section with the new section
          if (matchingNewSection) section.replaceWith(matchingNewSection)
        })
      } catch (error) {
        console.error(error)
      }
    })

  });
})(Checkout.$);