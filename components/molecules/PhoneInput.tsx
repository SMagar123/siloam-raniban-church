"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import * as RPNInput from "react-phone-number-input"
import flags from "react-phone-number-input/flags"
import { cn } from "@/lib/utils"

// --- 1. The Main Input Wrapper ---
const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <input
    className={cn(
      "flex h-11 w-full rounded-e-xl border border-l-0 border-border bg-background px-4 py-3 text-sm transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary",
      className
    )}
    {...props}
    ref={ref}
  />
))
InputComponent.displayName = "InputComponent"

// --- 2. The Flag Renderer ---
const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country]
  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  )
}

// --- 3. The Country Dropdown ---
type CountryEntry = { label: string; value: RPNInput.Country | undefined }
type CountrySelectProps = {
  disabled?: boolean
  value: RPNInput.Country
  options: CountryEntry[]
  onChange: (country: RPNInput.Country) => void
}

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")

  const filteredCountries = countryList.filter(
    (c) =>
      c.label.toLowerCase().includes(search.toLowerCase()) ||
      (c.value && RPNInput.getCountryCallingCode(c.value).includes(search))
  )

  return (
    <div className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className="flex h-11 items-center gap-2 rounded-s-xl border border-border bg-background px-3 transition-colors hover:bg-muted/50 focus:z-10 focus:ring-1 focus:ring-primary focus:outline-none"
      >
        <FlagComponent
          country={selectedCountry}
          countryName={selectedCountry}
        />
        <ChevronsUpDown
          className={cn("-mr-1 size-4 opacity-50", disabled && "hidden")}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 z-50 mt-1 w-[300px] overflow-hidden rounded-xl border border-border bg-card shadow-xl">
            <div className="border-b border-border p-2">
              <input
                type="text"
                placeholder="Search country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md bg-muted/50 px-3 py-2 text-sm outline-none"
              />
            </div>
            <div className="max-h-64 overflow-y-auto p-1">
              {filteredCountries.length === 0 ? (
                <p className="p-4 text-center text-sm text-muted-foreground">
                  No country found.
                </p>
              ) : (
                filteredCountries.map(({ value, label }) =>
                  value ? (
                    <button
                      key={value}
                      type="button"
                      onClick={() => {
                        onChange(value)
                        setOpen(false)
                        setSearch("")
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent",
                        value === selectedCountry && "bg-accent"
                      )}
                    >
                      <FlagComponent country={value} countryName={label} />
                      <span className="flex-1 text-left">{label}</span>
                      <span className="text-xs text-muted-foreground">
                        +{RPNInput.getCountryCallingCode(value)}
                      </span>
                      <Check
                        className={cn(
                          "ml-auto size-4",
                          value === selectedCountry
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </button>
                  ) : null
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// --- 4. The Final Exported Component ---
const PhoneInput = React.forwardRef<
  React.ElementRef<typeof RPNInput.default>,
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void
  }
>(({ className, onChange, value, ...props }, ref) => {
  return (
    <RPNInput.default
      ref={ref}
      className={cn("flex", className)}
      flagComponent={FlagComponent}
      countrySelectComponent={CountrySelect}
      inputComponent={InputComponent}
      smartCaret={false}
      value={value || undefined}
      onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
      {...props}
    />
  )
})
PhoneInput.displayName = "PhoneInput"

export { PhoneInput }
