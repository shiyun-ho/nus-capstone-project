import _Handlebars2 from '../../../../../packages/@okta/courage-dist/esm/lib/handlebars/dist/cjs/handlebars.runtime.js';
import { View } from '../../../../../packages/@okta/courage-dist/esm/src/CourageForSigninWidget.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/framework/Model.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/vendor/lib/backbone.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/util/jquery-wrapper.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/util/underscore-wrapper.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/models/Model.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/models/BaseModel.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/framework/View.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/views/Backbone.ListView.js';
import { getMessage } from '../../../ion/i18nTransformer.js';

const I18N_KEY_PREFIX = 'idx.error.code.access_denied.device_assurance.remediation';
const HELP_AND_CONTACT_KEY_PREFIX = `${I18N_KEY_PREFIX}.additional_help_`;
const CUSTOM_URL_ADDITIONAL_HELP_KEY = `${I18N_KEY_PREFIX}.additional_help_custom`;
const REMEDIATION_OPTION_INDEX_KEY = `${I18N_KEY_PREFIX}.option_index`;
const TITLE_KEY = `${I18N_KEY_PREFIX}.title`;
const EXPLANATION_KEY_PREFIX = `${I18N_KEY_PREFIX}.explanation_`;
function buildRemediationOptionBlockMessage(message) {
  let link = null;
  if (message.links && message.links[0] && message.links[0].url) {
    link = message.links[0].url;
  }
  return {
    message: getMessage(message),
    link: link,
    className: message.i18n.key === REMEDIATION_OPTION_INDEX_KEY ? 'end-user-remediation-option' : 'end-user-remediation-action'
  };
}
var EndUserRemediationTerminalMessage = View.extend({
  className: 'end-user-remediation-terminal-view',
  template: _Handlebars2.template({
    "1": function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class=\"end-user-remediation-title\">" + container.escapeExpression((helper = (helper = lookupProperty(helpers, "title") || (depth0 != null ? lookupProperty(depth0, "title") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "title",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 53
          },
          "end": {
            "line": 1,
            "column": 62
          }
        }
      }) : helper)) + "</div>";
    },
    "3": function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class=\"end-user-remediation-explanation\">" + container.escapeExpression((helper = (helper = lookupProperty(helpers, "explanation") || (depth0 != null ? lookupProperty(depth0, "explanation") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "explanation",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 140
          },
          "end": {
            "line": 1,
            "column": 155
          }
        }
      }) : helper)) + "</div>";
    },
    "5": function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class=\"end-user-remediation-options\">" + ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "remediationOptions") : depth0, {
        "name": "each",
        "hash": {},
        "fn": container.program(6, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 236
          },
          "end": {
            "line": 1,
            "column": 420
          }
        }
      })) != null ? stack1 : "") + "</div>";
    },
    "6": function (container, depth0, helpers, partials, data) {
      var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class=\"" + container.escapeExpression((helper = (helper = lookupProperty(helpers, "className") || (depth0 != null ? lookupProperty(depth0, "className") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(alias1, {
        "name": "className",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 276
          },
          "end": {
            "line": 1,
            "column": 289
          }
        }
      }) : helper)) + "\">" + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "link") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(7, data, 0),
        "inverse": container.program(9, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 291
          },
          "end": {
            "line": 1,
            "column": 405
          }
        }
      })) != null ? stack1 : "") + "</div>";
    },
    "7": function (container, depth0, helpers, partials, data) {
      var helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = "function",
        alias4 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<a href=\"" + alias4((helper = (helper = lookupProperty(helpers, "link") || (depth0 != null ? lookupProperty(depth0, "link") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
        "name": "link",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 312
          },
          "end": {
            "line": 1,
            "column": 320
          }
        }
      }) : helper)) + "\" target=\"_blank\" rel=\"noopener noreferrer\">" + alias4((helper = (helper = lookupProperty(helpers, "message") || (depth0 != null ? lookupProperty(depth0, "message") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
        "name": "message",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 364
          },
          "end": {
            "line": 1,
            "column": 375
          }
        }
      }) : helper)) + "</a>";
    },
    "9": function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return container.escapeExpression((helper = (helper = lookupProperty(helpers, "message") || (depth0 != null ? lookupProperty(depth0, "message") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "message",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 387
          },
          "end": {
            "line": 1,
            "column": 398
          }
        }
      }) : helper));
    },
    "11": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return container.escapeExpression((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "i18n",
        "hash": {
          "$1": "<a href='#' target='_blank' rel='noopener noreferrer' class='additional-help'>$1</a>",
          "bundle": "login",
          "code": "idx.error.code.access_denied.device_assurance.remediation.additional_help_custom"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 510
          },
          "end": {
            "line": 1,
            "column": 712
          }
        }
      }));
    },
    "13": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return container.escapeExpression((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "i18n",
        "hash": {
          "$1": "<a href='#' target='_blank' rel='noopener noreferrer' class='additional-help'>$1</a>",
          "bundle": "login",
          "code": "idx.error.code.access_denied.device_assurance.remediation.additional_help_default"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 720
          },
          "end": {
            "line": 1,
            "column": 923
          }
        }
      }));
    },
    "compiler": [8, ">= 4.3.0"],
    "main": function (container, depth0, helpers, partials, data) {
      var stack1,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "title") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(1, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 75
          }
        }
      })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "explanation") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(3, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 75
          },
          "end": {
            "line": 1,
            "column": 168
          }
        }
      })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "remediationOptions") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(5, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 168
          },
          "end": {
            "line": 1,
            "column": 433
          }
        }
      })) != null ? stack1 : "") + "<div class=\"end-user-remediation-help-and-contact\">" + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "useCustomHelpText") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(11, data, 0),
        "inverse": container.program(13, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 484
          },
          "end": {
            "line": 1,
            "column": 930
          }
        }
      })) != null ? stack1 : "") + "</div>";
    },
    "useData": true
  }),
  getTemplateData: function () {
    const messages = this.options.messages.value;
    const remediationOptions = [];
    let title = null;
    let explanation = null;
    let useCustomHelpText = false;
    messages.forEach(message => {
      if (message.i18n.key === TITLE_KEY) {
        title = getMessage(message);
      } else if (message.i18n.key.startsWith(EXPLANATION_KEY_PREFIX)) {
        explanation = getMessage(message);
      } else if (message.i18n.key.startsWith(HELP_AND_CONTACT_KEY_PREFIX)) {
        useCustomHelpText = message.i18n.key === CUSTOM_URL_ADDITIONAL_HELP_KEY;
        if (message.links && message.links[0] && message.links[0].url) {
          this.additionalHelpUrl = message.links[0].url;
        }
      } else {
        remediationOptions.push(buildRemediationOptionBlockMessage(message));
      }
    });
    return {
      title: title,
      explanation: explanation,
      remediationOptions: remediationOptions,
      useCustomHelpText: useCustomHelpText
    };
  },
  render: function () {
    View.prototype.render.apply(this, arguments);
    if (this.additionalHelpUrl) {
      this.$el.find('.additional-help').attr('href', this.additionalHelpUrl);
    }
  }
});

export { EndUserRemediationTerminalMessage as default };
//# sourceMappingURL=EndUserRemediationTerminalMessage.js.map
