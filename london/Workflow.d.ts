declare namespace global {
    /**
     * The scoped Workflow API provides methods that can be used in an activity definition script.
     *
     * There are no constructors for creating an instance of a scoped workflow object. Instead,
     * use the global workflow object available in activity scripts. This workflow object is available
     * in any script location inside a workflow.
     * @class Workflow
     * @typedef {Object}  Workflow
     */
    class Workflow {
        /**
         * Returns the workflow variables.
         * @example
         * var user = workflow.inputs.u_user; // Workflow variables as name value pairs.
         */
        readonly inputs: Object;

        /**
         * Returns the workflow's result.
         * @example
         * var user = workflow.result;  // Workflow's results
         */
        readonly result: String;

        /**
         * Adds a debug message to the log.
         * @param message The message to add to the log.
         * @param args Arguments to add to the message.
         * @return The message added to the log.
         * @example
         * var loggedMessage = workflow.debug("All is well");
         */
        debug(message: String, args: Object): String;

        /**
         * Adds an error message to the log.
         * @param message The message to add to the log.
         * @param args Arguments to add to the message.
         * @return The logged message
         * @example
         * var loggedMessage = workflow.error("An error has occurred. ");
         */
        error(message: String, args: Object): String;

        /**
         * Returns the specified variable's value.
         * @param name The variable name
         * @return The variable's value
         * @example
         * var value = workflow.getVariable("task");
         */
        getVariable(name: String): Object;

        /**
         * Adds an informational message to the log.
         * @param message The message to add to the log.
         * @param args Arguments to add to the message.
         * @return The message that is logged.
         * @example
         * var loggedMessage = workflow.info("All is well");
         */
        info(message: String, args: Object): String;

        /**
         * Returns the workflow name.
         * @return The workflow name
         * @example
         * var name = workflow.name();
         */
        name(): String;

        /**
         * Removes the specified variable from the workflow.
         * @param name The variable name
         * @return Method does not return a value
         * @example
         * var value = workflow.removeVariable("task");
         */
        removeVariable(name: String): void;

        /**
         * Returns the workflow's scratchpad object.
         * @return The scratchpad object.
         * @example
         * var scratchpad = workflow.scratchpad();
         */
        scratchpad(): Object;

        /**
         * Sets the workflow's result.
         * @param result The workflow's result
         * @return Method does not return a value
         * @example
         * workflow.setResult("Success");
         */
        setResult(result: String): void;

        /**
         * Sets the specified variable to the specified value.
         * @param name The variable name
         * @param value The value to be assigned to the variable.
         * @return Method does not return a value
         * @example
         * workflow.setVariable("task", "terrible");
         */
        setVariable(name: String, value: Object): void;

        /**
         * Adds a warning message to the log.
         * @param message The message to add to the log.
         * @param args Arguments to add to the message.
         * @return The logged message
         * @example
         * var loggedMessage = workflow.warn("Check your permissions.");
         */
        warn(message: String, args: Object): String;
    }
}
