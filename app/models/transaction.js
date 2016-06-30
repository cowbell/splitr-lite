import DS from "ember-data";
import Ember from "ember";
import SyncModel from "splittypie/mixins/sync-model";

export default DS.Model.extend(SyncModel, {
    name: DS.attr("string"),
    amount: DS.attr("number"),
    date: DS.attr("string"),
    event: DS.belongsTo("event", { async: false }),
    payer: DS.belongsTo("user", { async: false }),
    participants: DS.hasMany("user", { async: false }),
    type: DS.attr("string", { defaultValue: "expense" }),
    typeOrDefault: Ember.computed("type", {
        get() {
            return this.get("type") || "expense";
        },
    }),

    month: Ember.computed("date", function () {
        const date = this.get("date");

        if (date) {
            return date.substring(0, 7);
        }

        return null;
    }),

    isTransfer: Ember.computed.equal("type", "transfer"),
});
