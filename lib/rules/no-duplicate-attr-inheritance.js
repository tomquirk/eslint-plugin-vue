/**
 * @fileoverview Disable inheritAttrs when using v-bind="$attrs"
 * @author Hiroki Osame
 */
'use strict'

const utils = require('../utils')

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce `inheritAttrs` to be set to `false` when using `v-bind="$attrs"`',
      categories: undefined,
      recommended: false,
      url: 'https://eslint.vuejs.org/rules/no-duplicate-attr-inheritance.html'
    },
    fixable: null,
    schema: [
      // fill in your schema
    ]
  },

  create (context) {
    let inheritsAttrs = true

    return Object.assign(
      utils.executeOnVue(context, (node) => {
        const inheritAttrsProp = node.properties.find(prop => (prop.type === 'Property' && utils.getStaticPropertyName(prop) === 'inheritAttrs'))

        if (inheritAttrsProp && inheritAttrsProp.value.type === 'Literal') {
          inheritsAttrs = inheritAttrsProp.value.value
        }
      }),
      utils.defineTemplateBodyVisitor(context, {
        "VAttribute[directive=true][key.name.name='bind'][key.argument=null] > VExpressionContainer" (node) {
          if (!inheritsAttrs) {
            return
          }
          const attrsRef = node.references.find(reference => {
            if (reference.variable != null) {
              // Not vm reference
              return false
            }
            return reference.id.name === '$attrs'
          })

          if (attrsRef) {
            context.report({
              node: attrsRef.id,
              message: 'Set "inheritAttrs" to false.'
            })
          }
        }
      })
    )
  }
}
