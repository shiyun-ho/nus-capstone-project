import '../../internals/BaseHeader.js';
import '../../internals/BaseFooter.js';
import BaseForm from '../../internals/BaseForm.js';
import '../../internals/BaseFormWithPolling.js';
import '../../internals/BaseOktaVerifyChallengeView.js';
import { loc } from '../../../../../packages/@okta/courage-dist/esm/src/CourageForSigninWidget.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/framework/Model.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/vendor/lib/backbone.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/util/jquery-wrapper.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/util/underscore-wrapper.js';
import '../../../../../packages/@okta/courage-dist/esm/lib/handlebars/dist/cjs/handlebars.runtime.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/models/Model.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/models/BaseModel.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/framework/View.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/views/Backbone.ListView.js';
import BaseView from '../../internals/BaseView.js';
import '../../components/AuthenticatorEnrollOptions.js';
import '../../components/AuthenticatorVerifyOptions.js';
import '../../../../util/FactorUtil.js';
import '../../../../v1/views/admin-consent/ScopeList.js';
import '../../../../v1/views/consent/ScopeList.js';
import '../captcha/CaptchaView.js';

// for BETA,
// redirect is needed for Apple SSO Extension to intercept the request, because
// - XHR request is not interceptable
// - form post is interceptable, but some app (Outlook) closes the app after
// We may have a different approach/UX for EA
const Body = BaseForm.extend({
  noButtonBar: true,
  className: 'ion-form device-challenge-poll',
  title: function () {
    return loc('deviceTrust.sso.redirectText', 'login');
  },
  initialize: function () {
    var _this$options$current, _this$options$current2;
    BaseForm.prototype.initialize.apply(this, arguments);
    this.listenTo(this.model, 'error', () => {
      this.$('.spinner').hide();
    });
    this.add('<div class="spinner"></div>');
    const isGetMethod = ((_this$options$current = this.options.currentViewState) === null || _this$options$current === void 0 ? void 0 : (_this$options$current2 = _this$options$current.method) === null || _this$options$current2 === void 0 ? void 0 : _this$options$current2.toLowerCase()) === 'get';
    this.model.set('useRedirect', isGetMethod);
    this.trigger('save', this.model);
  }
});
var SSOExtensionView = BaseView.extend({
  Body: Body
});

export { SSOExtensionView as default };
//# sourceMappingURL=SSOExtensionView.js.map
