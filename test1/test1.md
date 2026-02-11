# Exploratory Testing Report

## Application Overview
Monefy is a mobile personal finance application that allows users to track income and expenses, manage categories and accounts, view balance over time, and upgrade from a free version to a paid version via in-app purchase.

This testing session was performed on the free version of the application.

---

## Test Environment
- Platform: iOS  
- OS Version: iOS 26.1  
- Device: iPhone 13  
- Application: Monefy  
- App Version: 1.10.4  
- App Type: Free version  
- Testing Duration: 60 minutes  
- Testing Type: Exploratory, risk-based  

---

## Testing Approach
The session was time-boxed and focused on exploratory testing using risk-based charters.

Priority was given to:
- Core financial logic
- Monetization and paywall behavior (subscription purchase)
- Data integrity and consistency
- Critical user flows that can lead to irreversible or blocking states

---

## Exploratory Testing Charters

### Charter 1: Subscription Purchase (Paywall) Flow (High Priority)
**Goal:**  
Explore the monetization flow and ensure users can safely purchase a subscription or continue using the free version without being blocked.

**Scope:**  
- Paywall screen  
- Close (X) button  
- Continue → Apple Pay purchase flow  
- Restore purchases  
- Privacy Policy and Terms of Use links  

**Focus Areas:**  
- Ability to successfully complete a subscription purchase  
- Ability to decline the purchase and continue using the free version  
- Paywall behavior as a monetization reminder (frequency of appearance)  
- Broken or confusing restore purchases flow  
- Accessibility and correctness of legal links  

---

### Charter 2: Balance Calculation and Display (High Priority)
**Goal:**  
Validate correctness and consistency of balance calculation across the application.

**Scope:**  
- Main screen  
- Current balance  
- Income and expense totals for selected periods  
- Positive and negative balances  

**Focus Areas:**  
- Incorrect balance values  
- Inconsistencies between screens or time periods  

---

### Charter 3: Add Income Flow (High Priority)
**Goal:**  
Explore income creation and validation of required data.

**Scope:**  
- “+” button  
- Category selection  
- Amount input via calculator  
- Mandatory category selection  
- Mandatory amount greater than zero  
- Note field  

**Focus Areas:**  
- Presence and correctness of input validation  
- Incorrect amount calculation  
- Data loss during navigation  

---

### Charter 4: Add Expense Flow (High Priority)
**Goal:**  
Explore expense creation and validation of required data.

**Scope:**  
- “–” button  
- Category selection  
- Amount input via calculator  
- Mandatory category selection  
- Mandatory amount greater than zero  
- Note field  

**Focus Areas:**  
- Presence and correctness of input validation  
- Incorrect amount calculation  
- Data loss during navigation  

---

### Charter 5: Calculator and Amount Input (Medium Priority)
**Goal:**  
Explore numeric edge cases during amount input.

**Scope:**  
- Calculator input  
- Negative values  
- Large numbers  

**Focus Areas:**  
- Numeric overflow  
- Application crashes  
- Incorrect calculations  

---

### Charter 6: Filters and Time Intervals (Medium Priority)
**Goal:**  
Validate data aggregation and usability of date filters.

**Scope:**  
- Filters: Day, Week, Month, Year, All  

**Focus Areas:**  
- Incorrect aggregated totals  
- Poor navigation and usability experience  

---

### Charter 7: Account Selection (Medium Priority)
**Goal:**  
Explore data separation between different accounts.

**Scope:**  
- Account selection: All / Cash / Card  

**Focus Areas:**  
- Mixed transactions between accounts  
- Incorrect account balances  

---

### Charter 8: Search Functionality (Medium Priority)
**Goal:**  
Assess correctness and usability of transaction search.

**Scope:**  
- Search across all transactions  

---

### Charter 9: Categories and Accounts Management (Medium Priority)
**Goal:**  
Validate lifecycle management of categories and accounts.

**Scope:**  
- Create, rename, and delete categories  
- Add and remove accounts  

**Focus Areas:**  
- Data loss  
- Irreversible or blocking user states  

---

## Bugs Found

### Bug 1: Application crash caused by negative amount overflow
**Severity:** Critical  
**Suggested Priority:** High  

**Description:**  
By entering a negative value using the subtraction functionality, it is possible to overflow the amount input. This leads to an application crash.

**Impact:**  
- Application crash  
- Potential data loss  
- Significant loss of user trust in a financial application  

**Evidence:**  
- Video: [rec_1](https://drive.google.com/file/d/1qGMHgkibK1vN3_tgaVuuCxOdAb6qatxg/view?usp=sharing)

---

### Bug 2: Free users can delete all categories and become blocked
**Severity:** High  
**Suggested Priority:** High  

**Description:**  
In the free version, users cannot create new categories (paid feature), but they can delete all existing categories. After deleting all categories, the user is left without any categories and cannot add new transactions unless they upgrade to the paid version.

**Impact:**  
- Core functionality becomes unusable  
- User can enter a dead-end state  
- High risk of frustration and churn  

**Evidence:**  
- Video: [rec_2](https://drive.google.com/file/d/1_8j3FJB2ApJdIkv1UFv4LXX3osKOX49p/view?usp=sharing)

---

### Bug 3: All categories can be renamed to the same name
**Severity:** Medium  
**Suggested Priority:** Medium  

**Description:**  
The application allows renaming all categories to identical names without any validation.

**Impact:**  
- Confusing transaction history  
- Reduced data clarity and readability  


---

## Product Observations and Questions

### 1. Ability to select future dates in filters
**Severity:** Medium  

**Observation:**  
Date filters allow selecting future dates without any restrictions. After selecting a future date, the calendar remains on that date, and returning to the current date requires manual navigation.

**Risks:**  
- User confusion  
- Perceived missing data  
- Poor usability for frequent filtering  

**Questions:**  
- Is future date selection an intentional behavior?  
- Should future dates be restricted?  
- Should a “Today” shortcut be added?  

---

### 2. No limitations on note field input
**Severity:** Medium  

**Observation:**  
The note field allows unrestricted input without any length or format limitations.

**Risks:**  
- UI overflow  
- Potential performance issues  
- Inconsistent data quality  

**Questions:**  
- Should a character limit be introduced?  
- Is unlimited input a deliberate product decision?  

---

### 3. Deleting a category removes all related transactions
**Severity:** High  

**Observation:**  
Deleting a category also removes all related income and expense records without a clear warning to the user.

**Risks:**  
- Irreversible data loss  
- Loss of historical financial information  
- Critical trust issue for a finance application  

**Questions:**  
- Is this behavior intentional?  
- Should transactions be reassigned to another category instead?  
- Should the user be explicitly warned before deletion?  

---

## Conclusion
The exploratory testing session identified several critical risks related to data integrity, user trust, and monetization.

While the core functionality is present, the application allows users to enter unstable or irreversible states, which is especially critical for a financial product.

Addressing the identified issues would significantly improve reliability, usability, and long-term user retention.