/* eslint-disable */
/* eslint-disable no-underscore-dangle */
import { Ability, AbilityBuilder } from '@casl/ability';
import store from 'store/store';
import routes from "routes";

// Defines how to detect object's type
function subjectName(item) {
    if (!item || typeof item === 'string') {
        return item;
    }
    return item.__type;
}

const ability = new Ability([], { subjectName });

let currentAuth;
store.subscribe(() => {
    const prevAuth = currentAuth;
    currentAuth = store.getState().AppReducers.permission;
    if (prevAuth !== currentAuth) {
        ability.update(defineRulesFor(currentAuth));
    }
});

function defineRulesFor(auth) {
    const { can, rules } = AbilityBuilder.extract();
    if (auth.role === 'superadmin') {
        routes.map((x) => {
            if (x.collapse) {
                can('showCollapse', x.name, { userId: auth.user_id });
                x.views.map((y) => {
                    can('view', y.name, { userId: auth.user_id });
                })
            } else {
                can('view', x.name, { userId: auth.user_id });
            }
        })
    } else if (auth.role === 'admin') {
        let ignoreArray = ["Add Users", "Dashboard Users"]
        routes.map((x) => {
            if (x.collapse && ignoreArray.indexOf(x.name) === -1) {
                can('showCollapse', x.name, { userId: auth.user_id });
                x.views.map((y) => {
                    if (ignoreArray.indexOf(y.name) === -1) {
                        can('view', y.name, { userId: auth.user_id });
                    }
                })
            } else if (ignoreArray.indexOf(x.name) === -1) {
                can('view', x.name, { userId: auth.user_id });
            }
        });
    }
    return rules;
}

export default ability;