import Ember from "ember";

export default Ember.Route.extend({
    model(params) {
        return this.store.find("transaction", params.transactionId);
    },

    setupController(controller, model) {
        this._super(controller, model);
        model = this.get("formFactory").createForm("transaction", model);
        controller.setProperties({
            transaction: model,
            users: this.modelFor("event").get("users")
        });
    },

    renderTemplate() {
        this.render({into: "application"});
    },

    actions: {
        modelUpdated() {
            const event = this.modelFor("event");

            event.save()
                .then(() => this.transitionTo("event.transactions"));
        }
    }
});