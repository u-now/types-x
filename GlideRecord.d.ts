/**
 * Scoped GlideRecord is used for database operations.
 *
 * @class GlideRecord
 */
declare class GlideRecord {
    /**
     * Creates an instance of the GlideRecord class for the specified table.
     *
     * @param tableName The table to be used.
     * @example
     *
     * var gr = new GlideRecord('incident');
     */
    constructor(tableName: string);

    /**
     * Adds a filter to return active records.
     *
     * @returns Filter to return active records.
     * @example
     *
     * var inc = new GlideRecord('incident');
     * inc.addActiveQuery();
     * inc.query();
     */
    addActiveQuery(): GlideQueryCondition;

    /**
     * Adds an encoded query to other queries that may have been set.
     *
     * @param query An encoded query string
     * @example
     *
     * var queryString = "priority=1^ORpriority=2";
     * var gr = new GlideRecord('incident');
     * gr.addEncodedQuery(queryString);
     * gr.query();
     * while (gr.next()) {
     *     gs.addInfoMessage(gr.number);
     * }
     */
    addEncodedQuery(query: string): void;

    /**
     * Applies a pre-defined GlideDBFunctionBuilder object to a record.
     *
     * @param {Object} fun A GlideDBFunctionBuilder object that defines a SQL operation.
     * @returns Method does not return a value
     *
     * @example
     * var functionBuilder = new GlideDBFunctionBuilder();
     * var myAddingFunction = functionBuilder.add();
     * myAddingFunction = functionBuilder.field('order');
     * myAddingFunction = functionBuilder.field('priority');
     * myAddingFunction = functionBuilder.build();
     * var gr = new GlideRecord('incident');
     * gr.addFunction(myAddingFunction);
     * gr.addQuery(myAddingFunction, '<', 5);
     * gr.query();
     * while(gr.next())
     *     gs.log(gr.getValue(myAddingFunction));
     *
     */
    addFunction(fun: object): void;

    /**
     * Adds a filter to return records based on a relationship in a related table.
     *
     * @param {String} joinTable Table name
     * @param {Object} primaryField (Optional) If other than sys_id, the primary field
     * @param {Object} joinTableField (Optional) If other than sys_id, the field that joins the tables.
     * @returns A filter that lists records where the relationships match.
     * @example var prob = new GlideRecord('problem');
     * prob.addJoinQuery('incident');
     * prob.query();
     * @example // Look for Problem records that have associated Incident records
     * var gr = new GlideRecord('problem');
     * var grSQ = gr.addJoinQuery('incident');
     * // Where the Problem records are "active=false"
     * gr.addQuery('active', 'false');
     * // And the Incident records are "active=true"
     * grSQ.addCondition('active', 'true');
     * // Query
     * gr.query();
     * // Iterate and output results
     * while (gr.next()) {
     * gs.info(gr.getValue('number'));
     * }
     * @example var gr = new GlideRecord('problem');
     * gr.addJoinQuery('incident', 'opened_by', 'caller_id');
     * gr.query();
     */
    addJoinQuery(joinTable: any, primaryField: any, joinTableField: any): void;
    /**
     * A filter that specifies records where the value of the field passed in the parameter is
     * not null.
     * @param {String} fieldName The name of the field to be checked.
     * @returns A filter that specifies records where the value of the field passed in the
     * parameter is not null.
     * @example var target = new GlideRecord('incident');
     * target.addNotNullQuery('short_description');
     * target.query();   // Issue the query to the database to get all records where short_description is not null
     * while (target.next()) {
     * // add code here to process the incident record
     * }
     */
    addNotNullQuery(fieldName: any): void;
    /**
     * Adds a filter to return records where the value of the specified field is
     * null.
     * @param {String} fieldName The name of the field to be checked.
     * @returns The query condition added to the GlideRecord.
     * @example var target = new GlideRecord('incident');
     * target.addNullQuery('short_description');
     * target.query();   // Issue the query to the database to get all records where short_description is null
     * while (target.next()) {
     * // add code here to process the incident record
     * }
     */
    addNullQuery(fieldName: any): void;
    /**
     * Provides the ability to build a request, which when executed, returns the rows from the
     * specified table, that match the request.
     * @param {String} name Table field name.
     * @param {Object} value Value on which to query (not case-sensitive).
     * @returns The query condition added to the GlideRecord.
     * @example var rec = new GlideRecord('incident');
     * rec.addQuery('active', true);
     * rec.query();
     * while (rec.next()) {
     * rec.active = false;
     * gs.info('Active incident ' + rec.number + ' closed');
     * rec.update();
     * }
     */
    addQuery(name: string, value: any): void;
    /**
     * Provides the ability to build a request, which when executed, returns the rows from the
     * specified table, that match the request.
     * @param {String} name Table field name.
     * @param {String} operator Query operator. The available values are dependent on the data type of the
     * value parameter.Numbers:
     * =
     * !=
     * &gt;
     * &gt;=
     * &lt;
     * &lt;=
     * Strings (must be in upper case):
     * =
     * !=
     * IN
     * NOT IN
     * STARTSWITH
     * ENDSWITH
     * CONTAINS
     * DOES NOT CONTAIN
     * INSTANCEOF
     *
     * @param {Object} value Value on which to query (not case-sensitive).
     * @returns The query condition that was added to the GlideRecord.
     * @example var rec = new GlideRecord('incident');
     * rec.addQuery('active',true);
     * rec.addQuery('sys_created_on', "&gt;", "2010-01-19 04:05:00");
     * rec.query();
     * while (rec.next()) {
     * rec.active = false;
     * gs.info('Active incident ' + rec.number + ' closed');
     * rec.update();
     * }
     * @example var gr = new GlideRecord('incident');
     * gr.addQuery('number','IN','INC00001,INC00002');
     * gr.query();
     * while(gr.next()) {
     * //do something....
     * }
     */
    addQuery(name: string, operator: string, value: any): void;
    /**
     * Adds a filter to return records using an encoded query string.
     * @param {String} query An encoded query string
     * .
     * @returns The query condition added to the GlideRecord.
     * @example var rec = new GlideRecord('incident');
     * rec.addQuery('active=true');
     * rec.query();
     * while (rec.next()) {
     * rec.active = false;
     * gs.info('Active incident ' + rec.number + ' closed');
     * rec.update();
     * }
     */
    addQuery(query: string): void;
    /**
     * Determines if the Access Control Rules, which include the user's roles, permit
     * inserting new records in this table.
     * @returns True if the user's roles permit creation of new records in this
     * table.
     * @example var gr = new GlideRecord('incident');
     * gs.info(gr.canCreate());
     */
    canCreate(): void;
    /**
     * Determines if the Access Control Rules, which include the user's roles, permit deleting
     * records in this table.
     * @returns True if the user's roles permit deletions of records in this table.
     * @example var att = new GlideRecord('sys_attachment');
     * gs.info(att.canDelete());
     */
    canDelete(): void;
    /**
     * Determines if the Access Control Rules, which include the user's roles, permit reading
     * records in this table.
     * @returns True if the user's roles permit reading records from this table.
     * @example var gr = new GlideRecord('incident');
     * gs.info(gr.canRead());
     */
    canRead(): void;
    /**
     * Determines if the Access Control Rules, which include the user's roles, permit editing
     * records in this table.
     * @returns True if the user's roles permit writing to records from this table.
     * @example var gr = new GlideRecord('incident');
     * gs.info(gr.canWrite());
     */
    canWrite(): void;
    /**
     * Sets a range of rows to be returned by subsequent queries.
     * @param {Number} firstRow The first row to include.
     * @param {Number} lastRow The last row to include.
     * @param {Boolean} forceCount If true, the getRowCount() method will return all possible records.
     * @returns Method does not return a value
     * @example var gr = new GlideRecord('incident');
     * gr.orderBy('number');
     * gr.chooseWindow(2, 4);
     * gr.query();
     * if (gr.next()) {
     * gs.info(gr.number + ' is within window');
     * }
     */
    chooseWindow(firstRow: any, lastRow: any, forceCount: any): void;
    /**
     * Returns the number of milliseconds since January 1, 1970, 00:00:00 GMT for a duration
     * field. Does not require the creation of a GlideDateTime object because the duration field is
     * already a GlideDateTime object.
     * @returns Number of milliseconds since January 1, 1970, 00:00:00 GMT.
     * @example var inc = new GlideRecord('incident');
     * inc.get('17c90efb13418700cc36b1422244b05d');
     * gs.info(inc.calendar_duration.dateNumericValue());
     */
    dateNumericValue(): void;
    /**
     * Deletes multiple records that satisfy the query condition.
     * @returns Method does not return a value
     * @example var gr = new GlideRecord('incident')
     * gr.addQuery('active','false'); //to delete all inactive incidents
     * gr.deleteMultiple();
     */
    deleteMultiple(): void;
    /**
     * Deletes the current record.
     * @returns True if the record was deleted; false if no record was found to delete.
     * @example var gr = new GlideRecord('incident')
     * gr.addQuery('sys_id','99ebb4156fa831005be8883e6b3ee4b9'); //to delete one record
     * gr.query();
     * gr.next();
     * gr.deleteRecord();
     */
    deleteRecord(): void;
    /**
     * Defines a GlideRecord based on the specified expression of 'name = value'.
     * @param {Object} name Column name to match (if two arguments are specified), or sys_id (if one is specified)
     * @param {Object} [value] Value to match. If value is not specified, then the expression used is
     * 'sys_id = name'.
     * @returns True if one or more matching records was found. False if no matches
     * found.
     * @example var gr = new GlideRecord('incident');
     * gr.get('99ebb4156fa831005be8883e6b3ee4b9');
     * gs.info(gr.number);
     */
    get(name: any, value: any): void;
    /**
     * Returns the dictionary attributes for the specified field.
     * @param {String} fieldName Field name for which to return the dictionary attributes
     * @returns Dictionary attributes
     * @example doit();
     * function doit() {
     * var gr = new GlideRecord('sys_user');
     * gr.query("user_name","admin");
     * if (gr.next()) {
     * gs.print("we got one");
     * gs.print(gr.location.getAttribute("tree_picker"));
     * }
     * }
     */
    getAttribute(fieldName: any): void;
    /**
     * Returns the table's label.
     * @returns Table's label
     */
    getClassDisplayValue(): void;
    /**
     * Retrieves the display value for the current record.
     * @returns The display value for the current record.
     * @example var gr = new GlideRecord('incident');
     * gr.get('sys_id','ef43c6d40a0a0b5700c77f9bf387afe3');
     * gs.info(gr.getDisplayValue());
     */
    getDisplayValue(): void;
    /**
     * Returns the element's descriptor.
     * @returns Element's descriptor
     * @example var totalCritical  = 0;
     * var filledCritical = 0;
     * var fields         = current.getFields();
     * gs.print(fields);
     * for (var num = 0; num &lt; fields.size(); num++) {
     * gs.print("RUNNING ARRAY VALUE " + num);
     * var ed = fields.get(num).getED();
     * if(ed.hasAttribute("tiaa_critical")) {
     * gs.print("CRITICAL FIELD FOUND");
     * totalCritical ++;
     * if (!fields.get(num).isNil()) {
     * filledCritical ++;
     * }
     * }
     * }
     * var answer = 0;
     * gs.print("TOTAL - " + totalCritical);
     * gs.print("FILLED - " + filledCritical);
     * if (filledCritical &gt; 0 &amp;&amp; totalCritical &gt; 0) {
     * var pcnt = (filledCritical/totalCritical)*100;
     * answer = pcnt.toFixed(2);;
     * }
     * answer;
     */
    getED(): void;
    /**
     * Retrieves the GlideElement object for the specified field.
     * @param {String} columnName Name of the column to get the element from.
     * @returns The GlideElement for the specified column of the current record.
     * @example var elementName = 'short_description';
     * var gr = new GlideRecord('incident');
     * gr.initialize();
     * gr.setValue(elementName, "My DB is not working");
     * gr.insert();
     * gs.info(gr.getElement('short_description'));
     */
    getElement(columnName: any): void;
    /**
     * Retrieves the query condition of the current result set as an encoded query string.
     * @returns The encoded query as a string.
     * @example var gr = new GlideRecord('incident');
     * gr.addQuery('active', true);
     * gr.addQuery('priority', 1);
     * gr.query();
     * var encodedQuery = gr.getEncodedQuery();
     * gs.info(encodedQuery);
     */
    getEncodedQuery(): void;
    /**
     * Returns the field's label.
     * @returns Field's label
     * @example template.print("Summary of Requested items:\n");
     * var gr = new GlideRecord("sc_req_item");
     * gr.addQuery("request", current.sysapproval);
     * gr.query();
     * while(gr.next()) {
     * var nicePrice = gr.price.toString();
     * if (nicePrice != '') {
     * nicePrice = parseFloat(nicePrice);
     * nicePrice = nicePrice.toFixed(2);
     * }
     * template.print(gr.number + ":  " + gr.quantity + " X " + gr.cat_item.getDisplayValue()
     * + " at $" + nicePrice + " each \n");
     * template.print("    Options:\n");
     * for (key in gr.variables) {
     * var v = gr.variables[key];
     * if(v.getGlideObject().getQuestion().getLabel() != '') {
     * template.space(4);
     * template.print('     ' +  v.getGlideObject().getQuestion().getLabel() + " = "
     * + v.getDisplayValue() + "\n");
     * }
     * }
     * }
     */
    getLabel(): void;
    /**
     * Retrieves the last error message. If there is no last error message, null is returned.
     * @returns The last error message as a string.
     * @example // Setup a data policy where short_description field in incident is mandatory
     * var gr = new GlideRecord('incident');
     * gr.insert(); // insert without data in mandatory field
     * var errormessage = gr.getLastErrorMessage();
     * gs.info(errormessage);
     */
    getLastErrorMessage(): void;
    /**
     * Retrieves a link to the current record.
     * @param {Boolean} [noStack] If true, the sysparm_stack parameter is not appended to the link. The parameter
     * sysparm_stack specifies the page to visit after closing the current link.
     * @returns A link to the current record as a string.
     * @example gr = new GlideRecord('incident');
     * gr.addActiveQuery();
     * gr.addQuery("priority", 1);
     * gr.query();
     * gr.next()
     * gs.info(gs.getProperty('glide.servlet.uri') + gr.getLink(false));
     */
    getLink(noStack: any): void;
    /**
     * Retrieves the class name for the current record.
     * @returns The class name.
     * @example var gr = new GlideRecord('incident');
     * var recordClassName = gr.getRecordClassName();
     * gs.info(recordClassName);
     */
    getRecordClassName(): void;
    /**
     * Retrieves the number of rows in the query result.
     * @returns The number of rows.
     * @example var gr = new GlideRecord('incident')
     * gr.query();
     * gs.info("Records in incident table: " + gr.getRowCount());
     */
    getRowCount(): void;
    /**
     * Retrieves the name of the table associated with the GlideRecord.
     * @returns The table name
     * @example var gr = new GlideRecord('incident');
     * gs.info(gr.getTableName());
     */
    getTableName(): void;
    /**
     * Gets the primary key of the record, which is usually the sys_id unless otherwise
     * specified.
     * @returns The unique primary key as a String, or null if the key is null.
     * @example var gr = new GlideRecord('kb_knowledge');
     * gr.query();
     * gr.next();
     * var uniqueid = gr.getUniqueValue();
     * gs.info(uniqueid);
     */
    getUniqueValue(): void;
    /**
     * Retrieves the string value of an underlying element in a field.
     * @param {String} name The name of the field to get the value from.
     * @returns The value of the field.
     * @example var gr = new GlideRecord('incident');
     * gr.orderBy('number');
     * gr.query('active','true');
     * gr.next() ;
     * gs.info(gr.getValue('number'));
     */
    getValue(name: any): void;
    /**
     * Determines if there are any more records in the GlideRecord object.
     * @returns True if there are more records in the query result set.
     * @example var rec = new GlideRecord('incident');
     * rec.query();
     * if (rec.hasNext()) {
     * gs.info("Table is not empty");
     * }
     */
    hasNext(): void;
    /**
     * Creates an empty record suitable for population before an insert.
     * @returns Method does not return a value
     * @example var gr = new GlideRecord('incident');
     * gr.initialize();
     * gr.name='New Incident';
     * gr.description='Incident description';
     * gr.insert();
     */
    initialize(): void;
    /**
     * Inserts a new record using the field values that have been set for the current record.
     * @returns Unique ID of the inserted record, or null if the record is not
     * inserted.
     * @example var gr = new GlideRecord('incident');
     * gr.initialize();
     * gr.name = 'New Incident';
     * gr.description = 'Incident description';
     * gr.insert();
     */
    insert(): void;
    /**
     * Checks to see if the current database action is to be aborted.
     * @returns True if the current database action is to be aborted
     * @example var gr = new GlideRecord('incident');
     * gs.info(gr.isActionAborted());
     */
    isActionAborted(): void;
    /**
     * Checks if the current record is a new record that has not yet been inserted into the
     * database.
     * @returns True if the record is new and has not been inserted into the database.
     * @example var gr = new GlideRecord("x_app_table");
     * gr.newRecord(); // create a new record and populate it with default values
     * gs.info(gr.isNewRecord());
     */
    isNewRecord(): void;
    /**
     * Determines if the table exists.
     * @returns True if table is valid or if record was successfully retrieved. False if table
     * is invalid or record was not successfully retrieved.
     * @example var gr = new GlideRecord('incident');
     * gs.info(gr.isValid());
     * var anotherGr = new GlideRecord('wrong_table_name');
     * gs.info(anotherGr.isValid());
     */
    isValid(): void;
    /**
     * Determines if the specified field is defined in the current table.
     * @param {String} columnName The name of the the field.
     * @returns True if the field is defined for the current table.
     * @example var gr = new GlideRecord('incident');
     * gr.initialize();
     * gs.info(gr.isValidField("short_description"));
     */
    isValidField(columnName: any): void;
    /**
     * Determines if current record is a valid record.
     * @returns True if the current record is valid. False if past the end of the record set.
     * @example var rec = new GlideRecord('incident');
     * rec.query();
     * while (rec.next()) {
     * gs.info(rec.number + ' exists');
     * }
     * gs.info(rec.isValidRecord());
     */
    isValidRecord(): void;
    /**
     * Creates a new GlideRecord record, sets the default values for the fields, and assigns a
     * unique ID to the record.
     * @returns Method does not return a value
     * @example var gr = new GlideRecord("x_app_table");
     * gr.newRecord();
     * gs.info(gr.isNewRecord());
     */
    newRecord(): void;
    /**
     * Moves to the next record in the GlideRecord object.
     * @returns True if moving to the next record is successful. False if there are no more
     * records in the result set.
     * @example var rec = new GlideRecord('incident');
     * rec.query();
     * while (rec.next()) {
     * gs.info(rec.number + ' exists');
     * }
     */
    next(): void;
    /**
     * Retrieves the current operation being performed, such as insert, update, or delete.
     * @returns The current operation.
     * @example //Commonly used in a business rule, returns insert if the current operation is insert
     * gs.info("current operation " + current.operation());
     */
    operation(): void;
    /**
     * Specifies an orderBy column.
     * @param {String} name The column name used to order the records in this GlideRecord object.
     * @returns Method does not return a value
     * @example
     * var queryString = "priority=2";
     * var gr = new GlideRecord('incident');
     * gr.orderBy('short_description'); // Ascending Order
     * gr.addEncodedQuery(queryString);
     * gr.query();
     * while (gr.next()) {
     *     gs.info(gr.short_description);
     * }
     */
    orderBy(name: any): void;
    /**
     * Specifies a decending orderBy column.
     * @param {String} name The column name to be used to order the records in a GlideRecord object.
     * @returns Method does not return a value
     * @example
     * var queryString = "priority=2";
     * var gr = new GlideRecord('incident');
     * gr.orderByDesc('short_description'); //Descending Order
     * gr.addEncodedQuery(queryString);
     * gr.query();
     * while (gr.next()) {
     *     gs.info(gr.short_description);
     * }
     */
    orderByDesc(name: any): void;
    /**
     * Runs the query against the table based on the filters specified by addQuery,
     * addEncodedQuery, etc.
     * @param {Object} field The column name to query on.
     * @param {Object} value The value to query for.
     * @returns Method does not return a value
     * @example var rec = new GlideRecord('incident');
     * rec.query();
     * while (rec.next()) {
     * gs.info(rec.number + ' exists');
     * }
     */
    query(field: any, value: any): void;
    /**
     * Sets a flag to indicate if the next database action (insert, update, delete) is to be
     * aborted. This is often used in business rules.
     * @param {Boolean} b True to abort the next action. False if the action is to be allowed.
     * @returns Method does not return a value
     * @example // Often used in business rule to check whether the current operation should be aborted.
     * if (current.size &gt; 16) {
     * current.setAbortAction(true);
     * }
     */
    setAbortAction(b: any): void;
    /**
     * Sets the duration field to a number of milliseconds since January 1, 1970, 00:00:00 GMT
     * for a duration field. Does not require the creation of a GlideDateTime object because the
     * duration field is already a GlideDateTime object.
     * @param {Number} milliseconds Number of milliseconds spanned by the duration.
     * @returns Method does not return a value
     * @example
     * var inc = new GlideRecord('incident');
     * inc.get('17c90efb13418700cc36b1422244b05d');
     * var timems = inc.calendar_duration.dateNumericValue();
     * timems = timems + 11*1000;
     * inc.calendar_duration.setDateNumericValue(timems)
     * gs.info(inc.calendar_duration.getValue());
     */
    setDateNumericValue(milliseconds: any): void;
    /**
     * Sets the limit for number of records are fetched by the GlideRecord query.
     * @param {Number} maxNumRecords The maximum number of records to fetch.
     * @returns Method does not return a value
     * @example var gr = new GlideRecord('incident');
     * gr.orderByDesc('sys_created_on');
     * gr.setLimit(10);
     * gr.query(); // this retrieves latest 10 incident records created
     */
    setLimit(maxNumRecords: any): void;
    /**
     * Sets sys_id value for the current record.
     * @param {String} guid The GUID to be assigned to the current record.
     * @returns Method does not return a value
     * @example ar gr = new GlideRecord('incident');
     * gr.short_description='The third floor printer is broken';
     * gr.setNewGuidValue('eb4636ca6f6d31005be8883e6b3ee333');
     * gr.insert();
     * gs.info(gr.sys_id);
     */
    setNewGuidValue(guid: any): void;
    /**
     * Sets the value of the field with the specified name to the specified value.
     * @param {String} name Name of the field.
     * @param {Object} value The value to assign to the field.
     * @returns Method does not return a value
     * @example var elementName = 'short_description';
     * var gr = new GlideRecord('incident');
     * gr.initialize();
     * gr.setValue(elementName, "My DB is not working");
     * gr.insert();
     */
    setValue(name: any, value: any): void;
    /**
     * Enables or disables the running of business rules, script engines, and
     * audit.
     * @param {Boolean} enable If true (default), enables business rules. If false, disables business
     * rules.
     * @returns Method does not return a value
     * @example //Enable business rules, scripts engines for x_app_table
     * var gr = new GlideRecord("x_app_table");
     * gr.setWorkflow(true);
     */
    setWorkflow(enable: any): void;
    /**
     * Updates the GlideRecord with any changes that have been made. If the record does not
     * already exist, it is inserted.
     * @param {String} [reason] The reason for the update. The reason is displayed in the audit record.
     * @returns Unique ID of the new or updated record. Returns null if the update
     * fails.
     * @example var gr = new GlideRecord('incident')
     * gr.get('99ebb4156fa831005be8883e6b3ee4b9');
     * gr.short_description='Update the short description';
     * gr.update();
     * gs.info(gr.getElement('short_description'));
     */
    update(reason: any): void;
    /**
     * Updates each GlideRecord in the list with any changes that have been made.
     * @returns Method does not return a value
     * @example / update the state of all active incidents to 4 - "Awaiting User Info"
     * var gr = new GlideRecord('incident')
     * gr.addQuery('active', true);
     * gr.query();
     * gr.setValue('state',  4);
     * gr.updateMultiple();
     */
    updateMultiple(): void;
    /**
     * Moves to the next record in the GlideRecord. Provides the same functionality as
     * next(), it is  intended to be used in cases where the GlideRecord has a
     * column named next.
     * @returns True if there are more records in the query set.
     * @example var rec = new GlideRecord('sys_template');
     * rec.query();
     * while (rec._next()) {
     * gs.print(rec.number + ' exists');
     * }
     */
    _next(): void;
    /**
     * Identical to query(). This method is intended to be used on tables
     * where there is a column named query, which would interfere with using the
     * query() method.
     * @param {Object} name Column name on which to query
     * @param {Object} value Value for which to query
     * @returns Method does not return a value
     * @example var rec = new GlideRecord('sys_app_module');
     * rec._query();
     * while (rec.next()) {
     * gs.print(rec.number + ' exists');
     * }
     */
    _query(name: any, value: any): void;
}

declare class GlideQueryCondition {
    /**
     * Adds an AND condition to the current condition.
     *
     * @param {string} name The name of a field.
     * @param {(object | string | number)} value The value to query on.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     * @example
     * var gr = new GlideRecord('incident');
     * var qc = gr.addQuery('category', 'Hardware');
     * qc.addCondition('category', 'Network');
     * gr.addQuery('number','INC0000003');
     * gr.next();
     * gr.number;
     * gs.info(gr.getEncodedQuery());
     */
    addCondition(name: string, value: object | string | number): GlideQueryCondition;
    /**
     * Adds an AND condition to the current condition.
     *
     * @param {string} name The name of a field.
     * @param {QueryOperator} oper The operator for the query.
     * If you do not specify an operator, the condition uses an equals operator.
     * @param {(object | string | number)} value The value to query on.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addCondition(name: string, oper: QueryOperator, value: object | string | number): GlideQueryCondition;
    /**
     * Appends a 2-or-3 parameter OR condition to an existing GlideQueryCondition.
     *
     * @param {string} name Field name
     * @param {(object | string | number)} value The value to query on.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addOrCondition(name: string, value: object | string | number): GlideQueryCondition;
    /**
     * Appends a 2-or-3 parameter OR condition to an existing GlideQueryCondition.
     *
     * @param {string} name Field name
     * @param {QueryOperator} oper Query operator.
     * The available values are dependent on the data type of the value parameter.
     *
     * Numbers:
     * * =
     * * !=
     * * &gt;
     * * &gt;=
     * * &lt;
     * * &lt;=
     *
     * Strings (must be in upper case):
     * * =
     * * !=
     * * IN
     * * STARTSWITH
     * * ENDSWITH
     * * CONTAINS
     * * DOESNOTCONTAIN
     * @param {(object | string | number)} value The value to query on.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addOrCondition(name: string, oper: QueryOperator, value: object | string | number): GlideQueryCondition;
}

type QueryOperator =
    | '='
    | '!='
    | '>'
    | '>='
    | '<'
    | '<='
    | 'IN'
    | 'STARTSWITH'
    | 'ENDSWITH'
    | 'CONTAINS'
    | 'DOESNOTCONTAIN'
    | 'INSTANCEOF';

declare class GlideDBFunctionBuilder {
    /**
     * Instantiates a GlideDBFunctionBuilder object.
     *
     * @example
     * var builder = new GlideDBFunctionBuilder();
     */
    constructor();

    /**
     * Adds the values of two or more integer fields.
     *
     * @example
     * var functionBuilder = new GlideDBFunctionBuilder();
     * var myAddingFunction = functionBuilder.add();
     * myAddingFunction = functionBuilder.field('order');
     * myAddingFunction = functionBuilder.field('priority');
     * myAddingFunction = functionBuilder.build();
     */
    add(): void;

    /**
     * Builds the database function defined by the GlideDBFunctionBuilder object.
     *
     * @example
     * var functionBuilder = new GlideDBFunctionBuilder();
     * var myAddingFunction = functionBuilder.add();
     * myAddingFunction = functionBuilder.field('order');
     * myAddingFunction = functionBuilder.field('priority');
     * myAddingFunction = functionBuilder.build();
     * gs.print(myAddingFunction);
     */
    build(): void;

    /**
     * Concatenates the values of two or more fields.
     * @example
     *
     * var functionBuilder = new GlideDBFunctionBuilder();
     * var myConcatFunction = functionBuilder.concat();
     * myConcatFunction = functionBuilder.field('short_description');
     * myConcatFunction = functionBuilder.field('caller_id.name');
     * myConcatFunction = functionBuilder.build();
     */
    concat(): void;

    /**
     * Defines a constant value to use in the function. If used with the dayofweek() method, the string defines whether
     * to use Sunday or Monday as the first day of the week.
     *
     * When used with the dayofweek() method, the value defines whether the week starts on a Sunday or Monday.
     * * 1: Week begins on Sunday.
     * * 2: Week begins on Monday.
     *
     * This definition enables the dayofweek() method to return the correct day of the week from a given date. If a
     * value other than 1 or 2 is provided, the dayofweek() method uses Sunday as the first day of the week.
     *
     * @param constant A constant value used in a function.
     */
    constant(constant: string): void;

    /**
     * Determines the duration using a given start date/time and end date/time.
     * Use the field(String field) method to define start and end date/time fields.
     */
    datediff(): void;

    // TODO add remainder
}
