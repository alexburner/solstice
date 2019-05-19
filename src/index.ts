const root = document.getElementById('root')
if (!root) throw new Error('Failed to find root element')

// tslint-disable-next-line: no-expression-statement
root.appendChild(document.createTextNode('Hello World'))
