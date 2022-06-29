import '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/custom-style.js';

const documentContainer = document.createElement('template');
documentContainer.innerHTML = `
  <custom-style>
    <style>
      html {
        --primary-color: #0099ff;
        --primary-background-color: #FFFFFF;
        --secondary-background-color: #eeeeee;
        --medium-theme-background-color: #eeeeee;
        --light-theme-background-color: var(--paper-grey-50);

        --primary-text-color: rgba(0, 0, 0, 0.87);
        --secondary-text-color: rgba(0, 0, 0, 0.54);

        --header-color: #ffffff;
        --header-bg-color: #233944;
        --header-icon-color: rgba(250, 250, 250, 0.70);
        --nonprod-header-color: #a94442;
        --nonprod-text-warn-color: #e6e600;

        --expand-icon-color: #4d4d4d;

        --main-border-color: #c1c1c1;
        --light-divider-color: rgba(0, 0, 0, 0.12);
        --light-hex-divider-color: #b8b8b8;
        --dark-divider-color: rgba(0, 0, 0, 0.40);
        --darker-divider-color: #9D9D9D;

        --dark-icon-color: rgba(0, 0, 0, 0.65);
        --light-icon-color: rgba(255, 255, 255, 1);

        --side-bar-scrolling: visible;

        --success-color: #72c300;
        --error-color: #ea4022;

        --add-button-color: var(--success-color);
        --icon-delete-color: var(--error-color);

        --primary-shade-of-green: #1A9251;
        --primary-shade-of-red: #E32526;
        --primary-shade-of-orange: orange;
        --light-hex-divider-color: #b8b8b8;

        --info-color: #cebc06;
        --light-info-color: #fff176;
        --lightest-info-color: #fef9cd;
        --warning-background-color: #fff3cd;
        --warning-color: #856404;
        --warning-border-color: #ffeeba;

        --error-box-heading-color: var(--error-color);
        --error-box-bg-color: #f2dede;
        --error-box-border-color: #ebccd1;
        --error-box-text-color: var(--error-color);

        --gray-06: rgba(0,0,0,.06);
        --gray-20: rgba(0,0,0,.20);
        --gray-50: rgba(0,0,0,.50);
        --gray-light: rgba(0,0,0,.38);

        --ecp-header-color: var(--primary-text-color);

        --etools-dialog-primary-color: #FFFFFF;
        --etools-dialog-contrast-text-color: var(--primary-text-color);

        --paper-input-container-label: {
          color: var(--secondary-text-color, #737373);
        }
        --paper-input-container-label-floating: {
          color: var(--secondary-text-color, #737373);
        }
        --paper-input-prefix: {
          color: var(--secondary-text-color, #737373);
          margin-right: 10px;
        };
        --esmm-external-wrapper: {
          width: 100%;
          margin: 0;
        };
        --paper-checkbox-checked-color: var(--primary-color);
        --paper-checkbox-unchecked-color: var(--secondary-text-color);
        --paper-radio-button-checked-color: var(--primary-color);
        --paper-radio-button-unchecked-color: var(--secondary-text-color);
        --basic-btn-style: {
          width: auto;
          margin: 0;
          color: var(--primary-color);
          padding: 0 5px 0 0;
          font-size: 14px;
          font-weight: bold;
        };

        --paper-item: {
          cursor: pointer;
        };

        *:focus:not(paper-icon-button):not(paper-radio-button) {
          outline: 0;
          box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12),
           0 3px 5px -1px rgba(0, 0, 0, 0.4);
        }

        --paper-button-flat-keyboard-focus: {
          outline: 0;
          box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.34), 0 1px 18px 0 rgba(0, 0, 0, 0.32),
           0 3px 5px -1px rgba(0, 0, 0, 0.6);
        }

        --paper-button-raised-keyboard-focus: {
          outline: 0;
          box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.34), 0 1px 18px 0 rgba(0, 0, 0, 0.32),
           0 3px 5px -1px rgba(0, 0, 0, 0.6);
        }

        --epd-profile-dialog-border-b: solid 1px var(--dark-divider-color);

        --required-star-style: {
          background: url('./images/required.svg') no-repeat 99% 20%/8px;
          width: auto !important;
          max-width: 100%;
          right: auto;
          padding-right: 15px;
        }
      }

      html[dir="rtl"] {
        --required-star-style: {
          background: url('./images/required.svg') no-repeat 99% 20%/8px;
          right: auto;
          padding-right: 15px;
        }
      }
    </style>
  </custom-style>`;

document.head.appendChild(documentContainer.content);
