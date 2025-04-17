# Hootenanny Raffle Ticket Display

This project is a live raffle number display system built for Out Our Front Door's Hootenanny event. It dynamically fetches and displays raffle ticket numbers and corresponding prizes in real time using a responsive, mobile-friendly web page.

## 🧠 Overview

The raffle display system is designed to:
- Showcase the **latest winning raffle ticket** and prize in a bold, prominent layout.
- List **previous winners** in a scrollable section.
- Automatically update every second from a server endpoint.
- Look clean and legible on both large screens and mobile devices.
- Show a QR code linking to the ticket checking page (only shows on desktops).

## 🛠️ Technologies Used

- HTML5 & CSS3 (Responsive design with media queries)
- Vanilla JavaScript for dynamic content updates
- Google Analytics (gtag.js)
- Custom icons and images for branding
- Mobile-friendly layout with accessibility and legibility in mind

## 📄 Website & API Endpoints
- /                    # Default Page - Used to verify if a ticket number is a valid winner
- /display             # Main Display Page (shows all drawn ticket numbers and their related prizes)
- /raffler             # Raffle Admin Page (use this to enter/delete winning tickets and their related prizes) 
- /api/current_numbers # GET - Provides a JSON Output of the current prize winners, including the winning ticket number as `number`, the prize number as `prize_number`, the prize description as `prize` and the prize donor (if available) as `donor`
- /api/current_numbers # POST - Requires 2 URL Encoded Form Data inputs, `ticket_number` (the winning raffle ticket number) and `prize` (the associated prize number) 
- /api/delete_number   # POST - Requires 1 URL Encoded Form Data input, `ticket_number` (the raffle ticket number you wish to delete)
- /api/prizes          # GET - Returns the list of prizes found in prizes.json

### /api/current_numbers (GET Response)
```
Request:
curl --location 'localhost:3000/api/current_numbers'

Response:
[
    {
        "number": "123456",
        "prize_number": "1",
        "prize": "Medium Lookfar Black & White Bike",
        "donor": "Fairdale"
    },
    {
        "number": "234567",
        "prize_number": "2",
        "prize": "A Bike",
        "donor": "Wheel and Sprocket"
    },
    {
        "number": "345678",
        "prize_number": "3",
        "prize": "Tour de Chequamegon Ticket (104-Mile Bikepacking Trip)",
        "donor": "Wheel and Sprocket"
    }
]
```

### /api/current_numbers (POST Example/Response)
```
Request:
curl --location 'localhost:3000/api/current_numbers' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'ticket_number=12345678' \
--data-urlencode 'prize=1'

Response:
{
    "status": true,
    "count": 4 (current count of winners)
}
```

### /api/delete_number (POST Example/Response)
```
Request:
curl --location 'localhost:3000/api/delete_number' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'ticket_number=12345678'

Response:
{
    "success": true,
    "deleted": 12345678
}
```

## 📦 Folder & File Structure

```
├── /public/                 # Everything in this folder will be accessible at host/filename. Store your Favicon/Logo/Other Files your clients need accessible 
├── /src/prizes.json         # Place your list of prizes here 
├── /src/pages/              # Store your Handlebars (or format of choice) here
```

## 🔄 How It Works

On page load, the script fetches data from /api/current_numbers.
- If there are prizes:
    The most recent prize is shown prominantly at the top, whereas earlier prizes are shown in the “Other Winners” section under it.
- If no prizes are currently listed:
    The page displays a “Waiting…” message, a drum roll message, and a tent logo — but only if not already in that state.
    This data is refreshed every second using setInterval.

## 📱 Responsive Design Details

The layout adjusts based on screen size:
On desktops and tablets, the display uses a side-aligned logo and fixed QR code.
On mobile, all elements stack vertically for easy reading.
Font sizes scale appropriately to maintain readability in loud or dim environments.

## 🧪 Edge Handling

If the API returns an empty list, the app enters a calm “waiting” state — but only if it's not already there, preventing UI flickering.
If the fetch fails, an error is logged to the console for debugging, but the UI doesn't crash.

## 🏆 Customization
If you'd like to adapt this display for another event:
- Update the Prizes found in prizes.json
- Replace the logo and image assets to match your branding.
- Tweak colors and layout in the `<style>` section of index.html.

## 🙌 Built For

This project was created for the Hootenanny celebration hosted by Out Our Front Door, a nonprofit promoting adventure and community by bike.

### 🎉 Good luck to all our raffle participants — and thank you for supporting bike-powered exploration!

## Example Images

![Ticket Checking Page](/readme_files/check.png)
![Ticket Display Page](/readme_files/display.png)
![Raffle Admin Page](/readme_files/raffler.png)