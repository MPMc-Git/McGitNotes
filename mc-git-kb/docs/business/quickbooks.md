---
tags:
  - Business
  - Import
  - Items
  - QBD
  - QBO
  - Quickbooks
  - PowerShell
  - Prices
  - UsedAI
---

## CURRENTLY UNTESTED

<small>

**NOTE**: [Transaction Pro Importer](https://www.rightworks.com/products/productivity-software/rightworks-transaction-pro/) is a great tool. This is assuming you don't want to spend the money on that product. You can, however, script mass updates using this tool as well.<br>
This is also purposely skipping the QuickBooks SDK. Ideally, the steps provided should be repeatable by largely non-technical people. Hopefully.

</small>

**Use Case**: If you have an external price list that gets updated, whether on a regular schedule or otherwise, this should help you to import the information into Quickbooks so you don't have to update the information by hand.

## Importing Items Into Quickbooks Desktop (QBD)
??? tip "UpdateQBPrices.ps1"
        ```powershell
        # --- CONFIGURATION ---
        $MappingFile = "C:\Imports\Mapping.csv"
        $PriceFile   = "C:\Imports\PriceUpdate.csv"
        $OutputFile  = "C:\Imports\UploadToQB.iif"
        $LogFile     = "C:\Imports\ErrorLog.txt"

        # --- PREPARATION ---
        $Map = @{}
        if (Test-Path $MappingFile) {
            Import-Csv $MappingFile | ForEach-Object { $Map[$_.VendorName] = $_.QBName }
        } else {
            Write-Error "Mapping file not found!"; exit
        }

        # IIF Headers for Inventory Items
        $IIFData = @("!INVITEM`tNAME`tPRICE")
        $Errors  = @()

        # --- PROCESSING ---
        $RawPrices = Import-Csv $PriceFile

        foreach ($row in $RawPrices) {
            $VendorName = $row.VendorName
            $NewPrice   = $row.NewPrice
            
            # Check if the VendorName exists in our mapping dictionary
            if ($Map.ContainsKey($VendorName)) {
                $QBName = $Map[$VendorName]
                $IIFData += "INVITEM`t$QBName`t$NewPrice"
            } else {
                # Log the mismatch
                $Errors += "$(Get-Date -Format 'HH:mm:ss') - MISSING MAPPING: Could not find QB Name for '$VendorName'"
            }
        }

        # --- OUTPUT & LOGGING ---
        $IIFData | Out-File $OutputFile -Encoding ascii

        if ($Errors.Count -gt 0) {
            $Errors | Out-File $LogFile
            Write-Host "$($Errors.Count) items failed. Opening ErrorLog.txt now..." -ForegroundColor Yellow
            
            # This line triggers the auto-open in your default text editor (usually Notepad)
            Start-Process notepad.exe $LogFile
        } else {
            "No errors found. All items mapped successfully on $(Get-Date)." | Out-File $LogFile
            Write-Host "Success! All items processed." -ForegroundColor Green
        }
        ```

In QBD, **File > Utilities > Import > IIF Files** and navigate to C:\Imports\Mapping.csv<br>
***Warning***: When importing the IIF, QuickBooks might show a prompt saying **"We've improved IIF imports."** If you have the option, choose the **"Import for me I'll fix it later"** (the old manual way) as it is much faster for simple price updates.

## Updating Imported Items' Prices In QBD
***This assumes***: You have two files
  - The mapping file built above
  - The new price list

Locate UpdateQBPrices.ps1, right-click and choose **Run in PowerShell**