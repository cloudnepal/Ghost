import ModalComponent from 'ghost-admin/components/modal-base';
import {alias} from '@ember/object/computed';
import {inject as service} from '@ember/service';
import {task} from 'ember-concurrency';

export default ModalComponent.extend({
    membersStats: service(),
    selectedLabel: null,

    // Allowed actions
    confirm: () => {},

    member: alias('model'),

    actions: {
        confirm() {
            this.deleteMember.perform();
        },

        setLabel(label) {
            this.set('selectedLabel', label);
        }
    },

    deleteMember: task(function* () {
        try {
            yield this.confirm(this.shouldCancelSubscriptions);
            this.membersStats.invalidate();
        } finally {
            this.send('closeModal');
        }
    }).drop()
});
