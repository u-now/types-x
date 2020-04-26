/**
 * The scoped GlideUser API provides access to information about the current user and
 * current user roles. Using the scoped GlideUser API avoids the need to use the slower GlideRecord
 * queries to get user information.
 */
interface GlideUser {
    /**
     * Returns the current user's company sys_id.
     * @returns Company sys_id
     * @example
     * var currentUser = gs.getUser();
     * gs.info(currentUser.getCompanyID());
     */
    getCompanyID(): string;

    /**
     * Returns the current user's display name.
     * @returns User's display name
     * @example
     * var currentUser = gs.getUser();
     * gs.info(currentUser.getDisplayName());
     */
    getDisplayName(): string;

    /**
     * The identifier that is returned depends on the domain type and the instantiation of that domain.
     * - If the user is configured in the global domain, and does not use the domain picker to switch
     *   domains, the method returns null.
     * - If the user uses the domain picker to switch to the global domain, the method returns the
     *   string "global".
     * - For all other domains, the method returns the sys_id of that domain.
     * @returns Domain identifier
     * @example
     * var domain = new GlideRecord('domain');
     * domain.get(gs.getUser().getDomainID());
     * gs.info(domain.name);
     */
    getDomainID(): string;

    /**
     * Returns the user's email address.
     * @returns User's email address
     * @example
     * var currentUser = gs.getUser();
     * gs.info(currentUser.getEmail());
     */
    getEmail(): string;

    /**
     * Returns the user's first name.
     * @returns User's first name
     * @example
     * var currentUser = gs.getUser();
     * gs.info(currentUser.getFirstName());
     */
    getFirstName(): string;

    /**
     * Gets the sys_id of the current user.
     * @returns User's sys_id
     * @example
     * var currentUser = gs.getUser();
     * gs.info(currentUser.getID());
     */
    getID(): string;

    /**
     * Returns the user's last name.
     * @returns User's last name
     * @example
     * var currentUser = gs.getUser();
     * gs.info(currentUser.getLastName());
     */
    getLastName(): string;

    /**
     * Returns the user ID, or login name, of the current user.
     * @returns User ID
     * @example
     * var currentUser = gs.getUser();
     * gs.info(currentUser.getName());
     */
    getName(): string;

    /**
     * Gets the specified user preference value for the current user.
     * @param {String} name The name of the preference.
     * @returns The preference value.
     * @example
     * var currentUser = gs.getUser();
     * currentUser.savePreference(­'myPref','red');
     * gs.info(currentUser.getPreference(­'myPref'));
     */
    getPreference(name: string): string;

    /**
     * Returns a list of roles that includes explicitly granted roles, inherited roles, and
     * roles acquired by group membership.
     * @returns List of all roles available to the user
     * @example
     * var currentUser = gs.getUser();
     * gs.info(currentUser.getRoles());
     */
    getRoles(): string[];

    /**
     * Returns the list of roles explicitly granted to the user.
     * @returns List of roles explicitly assigned to the user
     * @example
     * var currentUser = gs.getUser();
     * gs.info(currentUser.getUserRoles());
     */
    getUserRoles(): string[];

    /**
     * Determines if the current user has the specified role.
     * @param {String} role Role to check
     * @returns True if the user has the role.
     * @example
     * var currentUser = gs.getUser();
     * gs.info(currentUser.hasRole('admin'));
     */
    hasRole(role: string): boolean;

    /**
     * Determines if the current user is a member of the specified group.
     * @param {String} group Group to check
     * @returns True if the user is a member of the group.
     * @example
     * var currentUser = gs.getUser();
     * gs.info(currentUser.isMemberOf(­'Capacity Mgmt'));
     */
    isMemberOf(group: string): boolean;

    /**
     * Saves a user preference value to the database.
     * @param {String} name The preference to save.
     * @param {String} value The preference value.
     * @returns Method does not return a value
     * @example
     * var currentUser = gs.getUser();
     * currentUser.savePreference('myPref','red');
     * gs.info(currentUser.getPreference('myPref'));
     */
    savePreference(name: string, value: string): void;
}
