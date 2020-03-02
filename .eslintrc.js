module.exports = {
    root: true, 
    extends: 'standard', 
    plugins: [
        'html' 
    ],
    env: {
        browser: true, 
        node: true 
    },
    globals: { 
        $: true
    },
    rules: {  
        indent: ['error', 4], 
        'space-before-function-paren': 0,
        'eol-last': 0, 
        'semi': ['error', 'always']
    }
}