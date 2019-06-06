# solstice

Visualization of current year sun cycles

[![](https://i.imgur.com/OT8FMR9.png)](https://alexburner.github.io/solstice/)

## development

```sh
# Installation
npm install

# Development
npm run dev # run parcel dev server + watch (outputs to dev/)
npm run tsc # run typescript compiler + watch (no emit, types only)
npm run fix # run prettier & tslint + watch (uses onchange package)

# Build
npm run build # (outputs to docs/)

# Extras
npm run clean # for debugging: removes .cache/ + dev/
npm run prettier # run prettier + watch
npm run tslint # run tslint + watch
npm run prettier:once # run prettier once
npm run tslint:once # run tslint once
npm run fix:once # run prettier & tslint once
```
