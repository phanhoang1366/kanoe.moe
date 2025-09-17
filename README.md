# kanoe.moe
BA Domain Availability Checker

## Domain Availability Dashboard

A web-based dashboard to check domain availability and monitor if domains are still alive and responding.

### Features

- **Domain Availability Check**: Check if domains are available for registration
- **Domain Status Monitoring**: Monitor if domains are alive and responding to HTTP/HTTPS requests
- **Real-time Updates**: Refresh individual domains or all at once
- **Daily Automated Checks**: GitHub Actions workflow runs daily to update domain status
- **Responsive Design**: Works on desktop and mobile devices
- **Persistent Storage**: Domain list is saved in browser local storage

### Usage

1. Open `index.html` in your web browser
2. Click "Refresh All" to check all domains
3. Add new domains using the input field
4. Remove domains by clicking the "Remove" button on each domain card

### Automated Updates

The dashboard includes a GitHub Actions workflow that runs daily at 8:00 AM UTC to automatically check domain status. Results are committed back to the repository and displayed on the dashboard.

### Customization

- **Background Image**: Update the background image URL in `styles.css` (currently using a placeholder)
- **Default Domains**: Modify the `getDefaultDomains()` method in `script.js` to change the initial domain list
- **Check Frequency**: Adjust the cron schedule in `.github/workflows/domain-check.yml`

### Files

- `index.html` - Main dashboard interface
- `styles.css` - Styling and responsive design
- `script.js` - Domain checking logic and UI interactions
- `.github/workflows/domain-check.yml` - Automated daily domain checking
- `status-summary.json` - Summary data from automated checks
