# High-Level System Diagram

```mermaid
graph TD
    A[index.js] --> B[SiteSettingsProvider]
    B --> C[NavigationPanel]
    B --> D[SettingsNotice]
    B --> E[SettingsContainer]
    E --> F[SettingsSnackbar]
    E --> G[AddSettingPanel]

    %% External Services
    H[SettingsService - backbone.js] --> I[getSettings]
    H --> J[saveSettings]
    H --> K[addSetting]
    H --> L[editSetting]
    H --> M[deleteSetting]
    H --> N[deleteAllSettings - not in use]

    %% Styles and Hook
    A --> O[useSettings Hook]
    O --> P[fetchSettings]

    %% Define styles
    classDef component fill:#bbf,stroke:#333,stroke-width:2px;
    classDef service fill:#f9f,stroke:#333,stroke-width:2px;
    classDef hook fill:#cff,stroke:#333,stroke-width:2px;

    %% Apply styles
    class A,Q component;
    class H service;
    class O hook;
```

## Components

### SiteSettingsProvider

Provides context for the entire settings module and manages state and actions related to settings.

### Settings (Main Component)

Entry point of the settings module. Contains the following sub-components:
- **NavigationPanel**: Displays categories for navigation.
- **SettingsNotice**: Displays error notices.
- **SettingsContainer**: Displays settings fields for the selected category.
- **AddSettingPanel**: Provides a form to add new settings.
- **SettingsSnackbar**: Displays success notices in a snackbar format.

### NavigationPanel

Displays categories for navigation and allows switching between different categories.

### SettingsNotice

Displays error notices.

### SettingsContainer

Displays settings fields for the selected category and allows editing, saving, and deleting settings. Dynamically renders appropriate field components.

### AddSettingPanel

Provides a form to add new settings.

### SettingsSnackbar

Displays success notices in a snackbar format.
