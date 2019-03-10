/**
 * Scoped GlideRecord is used for database operations.
 */
declare class GlideRecord {
  readonly sys_created_by: string & GlideElement;
  readonly sys_created_on: GlideDateTime & GlideElement;
  readonly sys_id: string;
  readonly sys_mod_count: number & GlideElement;
  readonly sys_updated_by: string & GlideElement;
  readonly sys_updated_on: GlideDateTime & GlideElement;

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
   *   gs.addInfoMessage(gr.number);
   * }
   */
  addEncodedQuery(query: string): void;

  /**
   * Applies a pre-defined GlideDBFunctionBuilder object to a record.
   *
   * @param fun A GlideDBFunctionBuilder object that defines a SQL operation.
   * @returns Method does not return a value
   * @example
   *
   * var functionBuilder = new GlideDBFunctionBuilder();
   * var myAddingFunction = functionBuilder.add();
   * myAddingFunction = functionBuilder.field('order');
   * myAddingFunction = functionBuilder.field('priority');
   * myAddingFunction = functionBuilder.build();
   *
   * var gr = new GlideRecord('incident');
   * gr.addFunction(myAddingFunction);
   * gr.addQuery(myAddingFunction, '<', 5);
   * gr.query();
   * while(gr.next())
   *   gs.log(gr.getValue(myAddingFunction));
   *
   */
  addFunction(fun: GlideDBFunctionBuilder): void;

  /**
   * Adds a filter to return records based on a relationship in a related table.
   *
   * @param joinTable Table name
   * @param primaryField (Optional) If other than sys_id, the primary field
   * @param joinTableField (Optional) If other than sys_id, the field that joins the tables.
   * @returns A filter that lists records where the relationships match.
   * @example
   *
   * var prob = new GlideRecord('problem');
   * prob.addJoinQuery('incident');
   * prob.query();
   *
   * @example
   *
   * // Look for Problem records that have associated Incident records
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
   *   gs.info(gr.getValue('number'));
   * }
   *
   * @example
   *
   * var gr = new GlideRecord('problem');
   * gr.addJoinQuery('incident', 'opened_by', 'caller_id');
   * gr.query();
   */
  addJoinQuery(
    joinTable: string,
    primaryField?: string,
    joinTableField?: string
  ): GlideQueryCondition;

  /**
   * A filter that specifies records where the value of the field passed in the parameter is not
   * null.
   *
   * @param fieldName The name of the field to be checked.
   * @returns A filter that specifies records where the value of the field passed in the
   * parameter is not null.
   * @example
   *
   * var target = new GlideRecord('incident');
   * target.addNotNullQuery('short_description');
   * // Issue the query to the database to get all records where short_description is not null
   * target.query();
   * while (target.next()) {
   *   // add code here to process the incident record
   * }
   */
  addNotNullQuery(fieldName: string): GlideQueryCondition;

  /**
   * Adds a filter to return records where the value of the specified field is null.
   *
   * @param fieldName The name of the field to be checked.
   * @returns The query condition added to the GlideRecord.
   * @example
   *
   * var target = new GlideRecord('incident');
   * target.addNullQuery('short_description');
   * // Issue the query to the database to get all records where short_description is null
   * target.query();
   * while (target.next()) {
   *   // add code here to process the incident record
   * }
   */
  addNullQuery(fieldName: string): GlideQueryCondition;

  /**
   * Provides the ability to build a request, which when executed, returns the rows from the
   * specified table, that match the request.
   *
   * @param name Table field name.
   * @param value Value on which to query (not case-sensitive).
   * @returns The query condition added to the GlideRecord.
   * @example
   *
   * var rec = new GlideRecord('incident');
   * rec.addQuery('active', true);
   * rec.query();
   * while (rec.next()) {
   *   rec.active = false;
   *   gs.info('Active incident ' + rec.number + ' closed');
   *   rec.update();
   * }
   */
  addQuery(name: string, value: any): GlideQueryCondition;

  /**
   * Provides the ability to build a request, which when executed, returns the rows from the
   * specified table, that match the request.
   *
   * @param name Table field name.
   * @param operator Query operator. The available values are dependent on the data type of the
   * value parameter.
   *
   * Numbers:
   * - =
   * - !=
   * - &gt;
   * - &gt;=
   * - &lt;
   * - &lt;=
   *
   * Strings (must be in upper case):
   * - =
   * - !=
   * - IN
   * - NOT IN
   * - STARTSWITH
   * - ENDSWITH
   * - CONTAINS
   * - DOES NOT CONTAIN
   * - INSTANCEOF
   *
   * @param value Value on which to query (not case-sensitive).
   * @returns The query condition that was added to the GlideRecord.
   * @example
   *
   * var rec = new GlideRecord('incident');
   * rec.addQuery('active', true);
   * rec.addQuery('sys_created_on', '>', '2010-01-19 04:05:00');
   * rec.query();
   * while (rec.next()) {
   *   rec.active = false;
   *   gs.info('Active incident ' + rec.number + ' closed');
   *   rec.update();
   * }
   *
   * @example Using the IN operator.
   *
   * var gr = new GlideRecord('incident');
   * gr.addQuery('number','IN','INC00001,INC00002');
   * gr.query();
   * while (gr.next()) {
   *   //do something....
   * }
   */
  addQuery(name: string, operator: QueryOperator, value: any): GlideQueryCondition;

  /**
   * Adds a filter to return records using an encoded query string.
   *
   * @param query An encoded query string
   * @returns The query condition added to the GlideRecord.
   * @example
   *
   * var rec = new GlideRecord('incident');
   * rec.addQuery('active=true');
   * rec.query();
   * while (rec.next()) {
   *   rec.active = false;
   *   gs.info('Active incident ' + rec.number + ' closed');
   *   rec.update();
   * }
   */
  addQuery(query: string): GlideQueryCondition;

  /**
   * Determines if the Access Control Rules, which include the user's roles, permit
   * inserting new records in this table.
   *
   * @returns True if the user's roles permit creation of new records in this
   * table.
   * @example
   *
   * var gr = new GlideRecord('incident');
   * gs.info(gr.canCreate());
   */
  canCreate(): boolean;

  /**
   * Determines if the Access Control Rules, which include the user's roles, permit deleting
   * records in this table.
   *
   * @returns True if the user's roles permit deletions of records in this table.
   * @example
   *
   * var att = new GlideRecord('sys_attachment');
   * gs.info(att.canDelete());
   */
  canDelete(): boolean;

  /**
   * Determines if the Access Control Rules, which include the user's roles, permit reading
   * records in this table.
   *
   * @returns True if the user's roles permit reading records from this table.
   * @example
   *
   * var gr = new GlideRecord('incident');
   * gs.info(gr.canRead());
   */
  canRead(): boolean;

  /**
   * Determines if the Access Control Rules, which include the user's roles, permit editing
   * records in this table.
   *
   * @returns True if the user's roles permit writing to records from this table.
   * @example
   *
   * var gr = new GlideRecord('incident');
   * gs.info(gr.canWrite());
   */
  canWrite(): boolean;

  /**
   * Sets a range of rows to be returned by subsequent queries.
   *
   * @param firstRow The first row to include.
   * @param lastRow The last row to include.
   * @param forceCount If true, the getRowCount() method will return all possible records.
   * @returns Method does not return a value
   * @example
   *
   * var gr = new GlideRecord('incident');
   * gr.orderBy('number');
   * gr.chooseWindow(2, 4);
   * gr.query();
   * if (gr.next()) {
   *   gs.info(gr.number + ' is within window');
   * }
   */
  chooseWindow(firstRow: number, lastRow: number, forceCount?: boolean): void;

  /**
   * Returns the number of milliseconds since January 1, 1970, 00:00:00 GMT for a duration field.
   * Does not require the creation of a GlideDateTime object because the duration field is already a
   * GlideDateTime object.
   *
   * @returns Number of milliseconds since January 1, 1970, 00:00:00 GMT.
   * @example
   *
   * var inc = new GlideRecord('incident');
   * inc.get('17c90efb13418700cc36b1422244b05d');
   * gs.info(inc.calendar_duration.dateNumericValue());
   */
  dateNumericValue(): number;

  /**
   * Deletes multiple records that satisfy the query condition.
   *
   * @example
   *
   * var gr = new GlideRecord('incident')
   * gr.addQuery('active','false'); //to delete all inactive incidents
   * gr.deleteMultiple();
   */
  deleteMultiple(): void;

  /**
   * Deletes the current record.
   *
   * @returns True if the record was deleted; false if no record was found to delete.
   * @example
   *
   * var gr = new GlideRecord('incident')
   * gr.addQuery('sys_id','99ebb4156fa831005be8883e6b3ee4b9'); //to delete one record
   * gr.query();
   * gr.next();
   * gr.deleteRecord();
   */
  deleteRecord(): boolean;

  /**
   * Defines a GlideRecord based on the specified expression of 'name = value'.
   *
   * @param name Column name to match (if two arguments are specified), or sys_id (if one is
   * specified)
   * @param [value] Value to match. If value is not specified, then the expression used is
   * 'sys_id = name'.
   * @returns True if one or more matching records was found. False if no matches
   * found.
   * @example
   *
   * var gr = new GlideRecord('incident');
   * gr.get('99ebb4156fa831005be8883e6b3ee4b9');
   * gs.info(gr.number);
   */
  get(name: string, value?: string): boolean;

  /**
   * Returns the dictionary attributes for the specified field.
   *
   * @param fieldName Field name for which to return the dictionary attributes
   * @returns Dictionary attributes
   * @example
   *
   * doit();
   * function doit() {
   *   var gr = new GlideRecord('sys_user');
   *   gr.query("user_name","admin");
   *   if (gr.next()) {
   *     gs.print("we got one");
   *     gs.print(gr.location.getAttribute("tree_picker"));
   *   }
   * }
   */
  getAttribute(fieldName: string): string;

  /**
   * Returns the table's label.
   *
   * @returns Table's label
   */
  getClassDisplayValue(): string;

  /**
   * Retrieves the display value for the current record.
   *
   * @returns The display value for the current record.
   * @example
   *
   * var gr = new GlideRecord('incident');
   * gr.get('sys_id','ef43c6d40a0a0b5700c77f9bf387afe3');
   * gs.info(gr.getDisplayValue());
   */
  getDisplayValue(field?: string): string;

  /**
   * Returns the element's descriptor.
   *
   * @returns Element's descriptor
   * @example
   *
   * var totalCritical  = 0;
   * var filledCritical = 0;
   * var fields         = current.getFields();
   * gs.print(fields);
   * for (var num = 0; num &lt; fields.size(); num++) {
   *   gs.print("RUNNING ARRAY VALUE " + num);
   *   var ed = fields.get(num).getED();
   *   if(ed.hasAttribute("tiaa_critical")) {
   *     gs.print("CRITICAL FIELD FOUND");
   *     totalCritical ++;
   *     if (!fields.get(num).isNil()) {
   *       filledCritical ++;
   *     }
   *   }
   * }
   * var answer = 0;
   * gs.print("TOTAL - " + totalCritical);
   * gs.print("FILLED - " + filledCritical);
   * if (filledCritical &gt; 0 &amp;&amp; totalCritical &gt; 0) {
   *   var pcnt = (filledCritical/totalCritical)*100;
   *   answer = pcnt.toFixed(2);;
   * }
   * answer;
   */
  getED(): GlideElementDescriptor;

  /**
   * Retrieves the GlideElement object for the specified field.
   *
   * @param columnName Name of the column to get the element from.
   * @returns The GlideElement for the specified column of the current record.
   * @example
   *
   * var elementName = 'short_description';
   * var gr = new GlideRecord('incident');
   * gr.initialize();
   * gr.setValue(elementName, "My DB is not working");
   * gr.insert();
   * gs.info(gr.getElement('short_description'));
   */
  getElement(columnName: string): GlideElement;

  /**
   * Retrieves the query condition of the current result set as an encoded query string.
   *
   * @returns The encoded query as a string.
   * @example
   *
   * var gr = new GlideRecord('incident');
   * gr.addQuery('active', true);
   * gr.addQuery('priority', 1);
   * gr.query();
   * var encodedQuery = gr.getEncodedQuery();
   * gs.info(encodedQuery);
   */
  getEncodedQuery(): string;

  /**
   * Returns the field's label.
   *
   * @returns Field's label
   * @example
   *
   * template.print("Summary of Requested items:\n");
   * var gr = new GlideRecord("sc_req_item");
   * gr.addQuery("request", current.sysapproval);
   * gr.query();
   * while(gr.next()) {
   *   var nicePrice = gr.price.toString();
   *   if (nicePrice != '') {
   *     nicePrice = parseFloat(nicePrice);
   *     nicePrice = nicePrice.toFixed(2);
   *   }
   *   template.print(gr.number + ":  " + gr.quantity + " X " + gr.cat_item.getDisplayValue()
   *   + " at $" + nicePrice + " each \n");
   *   template.print("    Options:\n");
   *   for (key in gr.variables) {
   *     var v = gr.variables[key];
   *     if(v.getGlideObject().getQuestion().getLabel() != '') {
   *       template.space(4);
   *       template.print('     ' +  v.getGlideObject().getQuestion().getLabel() + " = "
   *         + v.getDisplayValue() + "\n");
   *     }
   *   }
   * }
   */
  getLabel(): string;

  /**
   * Retrieves the last error message. If there is no last error message, null is returned.
   *
   * @returns The last error message as a string.
   * @example
   *
   * // Setup a data policy where short_description field in incident is mandatory
   * var gr = new GlideRecord('incident');
   * gr.insert(); // insert without data in mandatory field
   * var errormessage = gr.getLastErrorMessage();
   * gs.info(errormessage);
   */
  getLastErrorMessage(): string;

  /**
   * Retrieves a link to the current record.
   *
   * @param noStack If true, the sysparm_stack parameter is not appended to the link.
   * The parameter sysparm_stack specifies the page to visit after closing the current link.
   * @returns A link to the current record as a string.
   * @example
   *
   * gr = new GlideRecord('incident');
   * gr.addActiveQuery();
   * gr.addQuery("priority", 1);
   * gr.query();
   * gr.next()
   * gs.info(gs.getProperty('glide.servlet.uri') + gr.getLink(false));
   */
  getLink(noStack: boolean): string;

  /**
   * Retrieves the class name for the current record.
   *
   * @returns The class name.
   * @example
   *
   * var gr = new GlideRecord('incident');
   * var recordClassName = gr.getRecordClassName();
   * gs.info(recordClassName);
   */
  getRecordClassName(): string;

  /**
   * Retrieves the number of rows in the query result.
   *
   * @returns The number of rows.
   * @example
   *
   * var gr = new GlideRecord('incident')
   * gr.query();
   * gs.info("Records in incident table: " + gr.getRowCount());
   */
  getRowCount(): number;

  /**
   * Retrieves the name of the table associated with the GlideRecord.
   *
   * @returns The table name
   * @example
   *
   * var gr = new GlideRecord('incident');
   * gs.info(gr.getTableName());
   */
  getTableName(): string;

  /**
   * Gets the primary key of the record, which is usually the sys_id unless otherwise
   * specified.
   *
   * @returns The unique primary key as a String, or null if the key is null.
   * @example
   *
   * var gr = new GlideRecord('kb_knowledge');
   * gr.query();
   * gr.next();
   * var uniqueid = gr.getUniqueValue();
   * gs.info(uniqueid);
   */
  getUniqueValue(): string;

  /**
   * Retrieves the string value of an underlying element in a field.
   *
   * @param name The name of the field to get the value from.
   * @returns The value of the field.
   * @example
   *
   * var gr = new GlideRecord('incident');
   * gr.orderBy('number');
   * gr.query('active','true');
   * gr.next() ;
   * gs.info(gr.getValue('number'));
   */
  getValue(name: string): string;

  /**
   * Determines if there are any more records in the GlideRecord object.
   *
   * @returns True if there are more records in the query result set.
   * @example
   *
   * var rec = new GlideRecord('incident');
   * rec.query();
   * if (rec.hasNext()) {
   * gs.info("Table is not empty");
   * }
   */
  hasNext(): boolean;

  /**
   * Creates an empty record suitable for population before an insert.
   *
   * @example
   *
   * var gr = new GlideRecord('incident');
   * gr.initialize();
   * gr.name='New Incident';
   * gr.description='Incident description';
   * gr.insert();
   */
  initialize(): void;

  /**
   * Inserts a new record using the field values that have been set for the current record.
   *
   * @returns Unique ID of the inserted record, or null if the record is not inserted.
   * @example
   *
   * var gr = new GlideRecord('incident');
   * gr.initialize();
   * gr.name = 'New Incident';
   * gr.description = 'Incident description';
   * gr.insert();
   */
  insert(): string;

  /**
   * Checks to see if the current database action is to be aborted.
   *
   * @returns True if the current database action is to be aborted
   * @example
   *
   * var gr = new GlideRecord('incident');
   * gs.info(gr.isActionAborted());
   */
  isActionAborted(): boolean;

  /**
   * Checks if the current record is a new record that has not yet been inserted into the database.
   *
   * @returns True if the record is new and has not been inserted into the database.
   * @example
   *
   * var gr = new GlideRecord("x_app_table");
   * gr.newRecord(); // create a new record and populate it with default values
   * gs.info(gr.isNewRecord());
   */
  isNewRecord(): boolean;

  /**
   * Determines if the table exists.
   *
   * @returns True if table is valid or if record was successfully retrieved. False if table is
   * invalid or record was not successfully retrieved.
   * @example
   *
   * var gr = new GlideRecord('incident');
   * gs.info(gr.isValid());
   * var anotherGr = new GlideRecord('wrong_table_name');
   * gs.info(anotherGr.isValid());
   */
  isValid(): boolean;

  /**
   * Determines if the specified field is defined in the current table.
   *
   * @param columnName The name of the the field.
   * @returns True if the field is defined for the current table.
   * @example
   *
   * var gr = new GlideRecord('incident');
   * gr.initialize();
   * gs.info(gr.isValidField("short_description"));
   */
  isValidField(columnName: string): boolean;

  /**
   * Determines if current record is a valid record.
   *
   * @returns True if the current record is valid. False if past the end of the record set.
   * @example
   *
   * var rec = new GlideRecord('incident');
   * rec.query();
   * while (rec.next()) {
   *   gs.info(rec.number + ' exists');
   * }
   * gs.info(rec.isValidRecord());
   */
  isValidRecord(): boolean;

  /**
   * Creates a new GlideRecord record, sets the default values for the fields, and assigns a unique
   * ID to the record.
   *
   * @example
   *
   * var gr = new GlideRecord("x_app_table");
   * gr.newRecord();
   * gs.info(gr.isNewRecord());
   */
  newRecord(): void;

  /**
   * Moves to the next record in the GlideRecord object.
   *
   * @returns True if moving to the next record is successful. False if there are no more records in
   * the result set.
   * @example
   *
   * var rec = new GlideRecord('incident');
   * rec.query();
   * while (rec.next()) {
   *   gs.info(rec.number + ' exists');
   * }
   */
  next(): boolean;

  /**
   * Retrieves the current operation being performed, such as insert, update, or delete.
   *
   * @returns The current operation.
   * @example
   *
   * //Commonly used in a business rule, returns insert if the current operation is insert
   * gs.info("current operation " + current.operation());
   */
  operation(): GlideRecordOperation;

  /**
   * Specifies an orderBy column.
   *
   * @param name The column name used to order the records in this GlideRecord object.
   * @example
   *
   * var queryString = "priority=2";
   * var gr = new GlideRecord('incident');
   * gr.orderBy('short_description'); // Ascending Order
   * gr.addEncodedQuery(queryString);
   * gr.query();
   * while (gr.next()) {
   *   gs.info(gr.short_description);
   * }
   */
  orderBy(name: string): void;

  /**
   * Specifies a decending orderBy column.
   *
   * @param name The column name to be used to order the records in a GlideRecord object.
   * @example
   *
   * var queryString = "priority=2";
   * var gr = new GlideRecord('incident');
   * gr.orderByDesc('short_description'); //Descending Order
   * gr.addEncodedQuery(queryString);
   * gr.query();
   * while (gr.next()) {
   *   gs.info(gr.short_description);
   * }
   */
  orderByDesc(name: string): void;

  /**
   * Runs the query against the table based on the filters specified by addQuery, addEncodedQuery,
   * etc.
   *
   * This queries the GlideRecord table as well as any references of the table. Usually this is
   * performed without arguments. If name/value pair is specified, "name=value" condition is added
   * to the query.
   *
   * @param field The column name to query on.
   * @param value The value to query for.
   * @example
   *
   * var rec = new GlideRecord('incident');
   * rec.query();
   * while (rec.next()) {
   *   gs.info(rec.number + ' exists');
   * }
   */
  query(field?: string, value?: any): void;

  /**
   * Sets a flag to indicate if the next database action (insert, update, delete) is to be aborted.
   * This is often used in business rules.
   *
   * @param b True to abort the next action. False if the action is to be allowed.
   * @example
   *
   * // Often used in business rule to check whether the current operation should be aborted.
   * if (current.size &gt; 16) {
   *   current.setAbortAction(true);
   * }
   */
  setAbortAction(b: boolean): void;

  /**
   * Sets the duration field to a number of milliseconds since January 1, 1970, 00:00:00 GMT for a
   * duration field. Does not require the creation of a GlideDateTime object because the duration
   * field is already a GlideDateTime object.
   *
   * @param milliseconds Number of milliseconds spanned by the duration.
   * @example
   *
   * var inc = new GlideRecord('incident');
   * inc.get('17c90efb13418700cc36b1422244b05d');
   * var timems = inc.calendar_duration.dateNumericValue();
   * timems = timems + 11*1000;
   * inc.calendar_duration.setDateNumericValue(timems)
   * gs.info(inc.calendar_duration.getValue());
   */
  setDateNumericValue(milliseconds: number): void;

  /**
   * Sets the limit for number of records are fetched by the GlideRecord query.
   *
   * @param maxNumRecords The maximum number of records to fetch.
   * @example
   *
   * var gr = new GlideRecord('incident');
   * gr.orderByDesc('sys_created_on');
   * gr.setLimit(10);
   * gr.query(); // this retrieves latest 10 incident records created
   */
  setLimit(maxNumRecords: number): void;

  /**
   * Sets sys_id value for the current record.
   *
   * @param guid The GUID to be assigned to the current record.
   * @example
   *
   * var gr = new GlideRecord('incident');
   * gr.short_description='The third floor printer is broken';
   * gr.setNewGuidValue('eb4636ca6f6d31005be8883e6b3ee333');
   * gr.insert();
   * gs.info(gr.sys_id);
   */
  setNewGuidValue(guid: string): void;

  /**
   * Sets the value of the field with the specified name to the specified value.
   *
   * @param name Name of the field.
   * @param value The value to assign to the field.
   * @example
   *
   * var elementName = 'short_description';
   * var gr = new GlideRecord('incident');
   * gr.initialize();
   * gr.setValue(elementName, "My DB is not working");
   * gr.insert();
   */
  setValue(name: string, value: any): void;

  /**
   * Enables or disables the running of business rules, script engines, and audit.
   *
   * @param enable If true (default), enables business rules. If false, disables business
   * rules.
   * @example
   *
   * //Enable business rules, scripts engines for x_app_table
   * var gr = new GlideRecord("x_app_table");
   * gr.setWorkflow(true);
   */
  setWorkflow(enable: boolean): void;

  /**
   * Updates the GlideRecord with any changes that have been made. If the record does not already
   * exist, it is inserted.
   *
   * @param [reason] The reason for the update. The reason is displayed in the audit record.
   * @returns Unique ID of the new or updated record. Returns null if the update fails.
   * @example
   *
   * var gr = new GlideRecord('incident')
   * gr.get('99ebb4156fa831005be8883e6b3ee4b9');
   * gr.short_description='Update the short description';
   * gr.update();
   * gs.info(gr.getElement('short_description'));
   */
  update(reason?: string): string;

  /**
   * Updates each GlideRecord in the list with any changes that have been made.
   *
   * @example
   *
   * // update the state of all active incidents to 4 - "Awaiting User Info"
   * var gr = new GlideRecord('incident')
   * gr.addQuery('active', true);
   * gr.query();
   * gr.setValue('state',  4);
   * gr.updateMultiple();
   */
  updateMultiple(): void;

  /**
   * Moves to the next record in the GlideRecord. Provides the same functionality as next(), it is
   * intended to be used in cases where the GlideRecord has a column named next.
   *
   * @returns True if there are more records in the query set.
   * @example
   *
   * var rec = new GlideRecord('sys_template');
   * rec.query();
   * while (rec._next()) {
   *   gs.print(rec.number + ' exists');
   * }
   */
  _next(): boolean;

  /**
   * Identical to query(). This method is intended to be used on tables where there is a column
   * named query, which would interfere with using the query() method.
   *
   * @param name Column name on which to query
   * @param value Value for which to query
   * @example
   *
   * var rec = new GlideRecord('sys_app_module');
   * rec._query();
   * while (rec.next()) {
   *   gs.print(rec.number + ' exists');
   * }
   */
  _query(name?: string, value?: any): void;
}

declare interface GlideQueryCondition {
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
  addCondition(
    name: string,
    oper: QueryOperator,
    value: object | string | number
  ): GlideQueryCondition;

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
   * @param name Field name
   * @param oper Query operator.
   * The available values are dependent on the data type of the value parameter.
   *
   * Numbers:
   * - =
   * - !=
   * - &gt;
   * - &gt;=
   * - &lt;
   * - &lt;=
   *
   * Strings (must be in upper case):
   * - =
   * - !=
   * - IN
   * - NOT IN
   * - STARTSWITH
   * - ENDSWITH
   * - CONTAINS
   * - DOES NOT CONTAIN
   * - INSTANCEOF
   * @param value The value to query on.
   * @returns A reference to a GlideQueryConditon that was added to the GlideRecord.
   */
  addOrCondition(name: string, oper: QueryOperator, value: any): GlideQueryCondition;
}

type QueryOperator =
  | '='
  | '!='
  | '>'
  | '>='
  | '<'
  | '<='
  | 'IN'
  | 'NOT IN'
  | 'STARTSWITH'
  | 'ENDSWITH'
  | 'CONTAINS'
  | 'DOES NOT CONTAIN'
  | 'INSTANCEOF';

declare class GlideDBFunctionBuilder {
  /**
   * Instantiates a GlideDBFunctionBuilder object.
   *
   * @example
   *
   * var builder = new GlideDBFunctionBuilder();
   */
  constructor();

  /**
   * Adds the values of two or more integer fields.
   *
   * @example
   *
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
   *
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
   *
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
   * - 1: Week begins on Sunday.
   * - 2: Week begins on Monday.
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

/**
 * The Scoped GlideElement API provides a number of convenient script methods for dealing
 * with fields and their values. Scoped GlideElement methods are available for the fields of the
 * current GlideRecord.
 */
interface GlideElement {
  /**
   * Determines if the user's role permits the creation of new records in this field.
   *
   * @returns True if the field can be created, false otherwise.
   */
  canCreate(): boolean;

  /**
   * Indicates whether the user's role permits them to read the associated GlideRecord.
   *
   * @returns True if the field can be read, false otherwise.
   */
  canRead(): boolean;

  /**
   * Determines whether the user's role permits them to write to the associated GlideRecord.
   *
   * @returns True if the user can write to the field, false otherwise.
   */
  canWrite(): boolean;

  /**
   * Determines if the current field has been modified. This functionality is available for all
   * available data types, except Journal fields.
   *
   * **Note:** The `changes()` method is not supported within ACL scripts.
   *
   * @returns True if the fields have been changed, false if the field has not.
   * @example
   *
   * // This method is often used in business rules. The following example shown is from a business
   * // rule, if "assigned_to" field value is changed, create a event in the EventQueue.
   * if (!current.assigned_to.nil() && current.assigned_to.changes()) {
   *   gs.eventQueue(
   *     'incident.assigned',
   *     current,
   *     current.assigned_to.getDisplayValue(),
   *     previous.assigned_to.getDisplayValue()
   *   );
   * }
   */
  changes(): boolean;

  /**
   * Determines if the previous value of the current field matches the specified object.
   *
   * **Note:** If the GlideRecord on which you are performing this method has only been initialized
   * and read, and has not been written, the underlying before-and-after values are the same. In
   * this case, the method returns `false`, as there has been no change to the data store.
   *
   * @param o An object value to check against the previous value of the current field.
   * @returns True if the previous value matches, false if it does not.
   * @example
   *
   * // The following example shows that in a business rule, if "active" field is changed from true,
   * // insert a event in the EventQueue.
   * if (current.active.changesFrom(true)) {
   *   gs.eventQueue('incident.inactive', current, current.incident_state, previous.incident_state);
   * }
   */
  changesFrom(o: object): boolean;

  /**
   * Determines if the new value of a field, after a change, matches the specified object.
   *
   * **Note:** The changesTo() method is not supported within ACL scripts.
   *
   * @param o An object value to check against the new value of the current field.
   * @returns True if the previous value matches, false if it does not.
   * @example
   *
   * // The following example shows that in a business rule, if "active" field is changed to false,
   * // insert a event in the EventQueue.
   * if (current.active.changesTo(false)) {
   *   gs.eventQueue('incident.inactive', current, current.incident_state, previous.incident_state);
   * }
   */
  changesTo(o: object): boolean;

  /**
   * Returns the value of the specified attribute from the dictionary.
   *
   * If the attribute is a boolean attribute, use `getBooleanAttribute(String)` to get the value as
   * a boolean rather than as a string.
   *
   * @param attributeName Attribute name
   * @returns Attribute value
   * @example
   *
   * doit();
   * function doit() {
   *   var gr = new GlideRecord('sys_user');
   *   gr.query('user_name', 'admin');
   *   if (gr.next()) {
   *     gs.print('we got one');
   *     gs.print(gr.location.getAttribute('tree_picker'));
   *   }
   * }
   */
  getAttribute(attributeName: string): string;

  /**
   * Returns the Boolean value of the specified attribute from the dictionary.
   *
   * To get the value as a string, use `getAttribute(string)`.
   *
   * @param {String} attributeName Attribute name
   * @returns Boolean value of the attribute. Returns false if the attribute does not exist.
   */
  getBooleanAttribute(attributeName: string): boolean;

  //
  // TODO: 2019-03-10 JCC continue updating JSDocs below
  //

  /**
   * Generates a choice list for a field.
   * @param dependent Optional: a dependent value
   * @returns An array list of choices.
   * @example var glideRecord = new GlideRecord('incident');
   * glideRecord.query('priority','1');
   * glideRecord.next();
   * // urgency has choice list: 1 - High, 2 - Medium, 3 - Low, with value: 1, 2, 3
   * var choices = glideRecord.urgency.getChoices();
   * gs.info(choices);
   */
  getChoices(name?: string): any[];

  /**
   * Returns the choice label for the current choice.
   * @returns The selected choice's label.
   * @example var glideRecord = new GlideRecord('incident');
   * glideRecord.query('priority','1');
   * glideRecord.next();
   * // urgency has choice list: 1 - High, 2 - Medium, 3 - Low, with value: 1, 2, 3
   * var choiceLabel = glideRecord.urgency.getChoiceValue();
   * gs.info(choiceLabel);
   */
  getChoiceValue(): string;

  /**
   * Returns the clear text value for Password (2 way encrypted) fields in scoped
   * applications.
   * @returns The clear text password.
   * @example var tablename = 'x_scoped_app_table'
   * var CI = new GlideRecord(tablename);
   * CI.addQuery('number', '0001002');
   * CI.query();
   * CI.next();
   * var password = CI.password_field
   * var decrypted = password.getDecryptedValue();
   * gs.info(decrypted);
   */
  getDecryptedValue(): string;

  /**
   * Gets the formatted display value of the field.
   * @param maxCharacters Optional: Maximum characters desired
   * @returns The display value of the field
   * @example var glideRecord = new GlideRecord('incident');
   * glideRecord.query('priority','1');
   * glideRecord.next();
   * gs.info(glideRecord.priority.getDisplayValue());
   */
  getDisplayValue(maxCharacters?: number): string;

  /**
   * Returns the field's element descriptor.
   * @returns The field's element descriptor.
   * @example var grInc = new GlideRecord('incident');
   * grInc.query('priority', '1');
   * var field = grInc.getElement('priority');
   * var ed = field.getED();
   */
  getED(): GlideElementDescriptor;

  /**
   * Returns the phone number in international format.
   * @returns The phone number in international format.
   */
  getGlobalDisplayValue(): any;

  /**
   * Returns the HTML value of a field.
   * @param maxChars Optional. Maximum number of characters to return.
   * @returns HTML value for the field.
   * @example var inccause = new GlideRecord("incident");
   * inccause.short_description = current.short_description;
   * inccause.comments = current.comments.getHTMLValue();
   * inccause.insert();
   */
  getHTMLValue(maxChars: number): string;

  /**
   * Returns either the most recent journal entry or all journal entries.
   * @param mostRecent If 1, returns the most recent entry. If -1, returns all journal
   * entries.
   * @returns For the most recent entry, returns a string that contains the field label,
   * timestamp, and user display name of the journal entry.
   * For all journal entries, returns the same information for all journal entries
   * ever entered as a single string with each entry delimited by "\n\n".
   * @example //gets all journal entries as a string where each entry is delimited by '\n\n'
   * var notes = current.work_notes.getJournalEntry(-1);
   * //stores each entry into an array of strings
   * var na = notes.split("\n\n");
   * for (var i = 0; i &lt; na.length; i++)
   * gs.print(na[i]);
   */
  getJournalEntry(mostRecent: number): string;

  /**
   * Returns the object label.
   * @returns Object label
   * @example var gr = new GlideRecord("sc_req_item");
   * gr.addQuery("request", current.sysapproval);
   * gr.query();
   * while(gr.next()) {
   * var nicePrice = gr.price.toString();
   * if (nicePrice != ) {
   * nicePrice = parseFloat(nicePrice);
   * nicePrice = nicePrice.toFixed(2);
   * }
   * template.print(gr.number + ":  " + gr.quantity + " X " + gr.cat_item.getDisplayValue() + " at $" + nicePrice + " each \n");
   * template.print("    Options:\n");
   * for (key in gr.variables) {
   * var v = gr.variables[key];
   * if(v.getGlideObject().getQuestion().getLabel() != ) {
   * template.space(4);
   * template.print('     ' +  v.getGlideObject().getQuestion().getLabel() + " = " + v.getDisplayValue() + "\n");
   * }
   * }
   * }
   */
  getLabel(): string;

  /**
   * Returns the name of the field.
   * @returns Field name
   */
  getName(): string;

  /**
   * Gets the table name for a reference element.
   * @returns The table name of the reference
   * @example var grINC = new GlideRecord('incident');
   * grINC.query('number','INC0010041'); // record assignment group assigned to "CAB Approval"
   * if (grINC.next()) {
   * // Get the table name
   * var tableName = grINC.assignment_group.getReferenceTable();
   * gs.info( tableName );
   * }
   */
  getReferenceTable(): string;

  /**
   * Returns a GlideRecord object for a given reference element.
   * @returns A GlideRecord object
   * @example
   * var grINC = new GlideRecord('incident');
   * grINC.notNullQuery('caller_id');
   * grINC.query();
   * if (grINC.next()) {
   * // Get a GlideRecord object for the referenced sys_user record
   * var grUSER = grINC.caller_id.getRefRecord();
   * if (grUSER.isValidRecord())
   * gs.print( grUSER.getValue('name') );
   * }
   */
  getRefRecord(): GlideRecord;

  /**
   * Returns the name of the table on which the field resides.
   * @returns Name of the table. The returned value may be different from the table Class
   * that the record is in. See Tables and Classes in the product documentation.
   * @example if (current.approver.getTableName() == "sysapproval_approver") {
   * if (current.approver == email.from_sys_id)  {
   * current.comments = "reply from: " + email.from + "\n\n" + email.body_text;
   * // if it's been cancelled, it's cancelled.
   * var doit = true;
   * if (current.state=='cancelled')
   * doit = false;
   * if (email.body.state != undefined)
   * current.state= email.body.state;
   * if (doit)
   * current.update();
   * } else {
   * gs.log("Approval for task ("+current.sysapproval.getDisplayValue()+") rejected because user sending
   * email( "+email.from+") does not match the approver ("+current.approver.getDisplayValue()+")");
   * }
   * }
   */
  getTableName(): string;

  /**
   * Determines if a field is null.
   * @returns True if the field is null or an empty string, false if not.
   * @example var glideRecord = new GlideRecord('incident');
   * glideRecord.query('priority','1');
   * glideRecord.next();
   * gs.info(glideRecord.state.nil());
   */
  nil(): boolean;

  /**
   * Sets the value of a date/time element to the specified number of milliseconds since
   * January 1, 1970 00:00:00 GMT.
   * @param milliseconds Number of milliseconds since 1/1/1970
   * @returns Method does not return a value
   * @example var gr = new GlideRecord("incident");
   * gr.initialize();
   * gr.opened_at.setDateNumericValue(10000);
   */
  setDateNumericValue(milliseconds): void;

  /**
   * Sets the display value of the field.
   * @param value The value to set for the field.
   * @returns Method does not return a value
   * @example var glideRecord = new GlideRecord('incident');
   * glideRecord.query('priority','1');
   * glideRecord.next();
   * //change the urgency to 3
   * glideRecord.urgency.setDisplayValue('3 - Low');
   * gs.info(glideRecord.urgency);
   */
  setDisplayValue(value: object): void;

  /**
   * Adds an error message. Available in Fuji patch 3.
   * @param errorMessage The error message.
   * @returns Method does not return a value
   * @example var glideRecord = new GlideRecord('incident');
   * glideRecord.query('priority','1');
   * glideRecord.next();
   * glideRecord.short_description.setError('Error text');
   */
  setError(value: string): void;

  /**
   * Sets the field to the specified phone number.
   * @param phoneNumber The phone number to set. This can be in either the international or local
   * format.
   * @param strict When true, specifies that the number specified must match the correct format.
   * When false, the system attempts to correct an improperly formatted phone
   * number.
   * @returns True if the value was set.
   */
  setPhoneNumber(phoneNumber: any, strict: boolean): boolean;

  /**
   * Sets the value of a field.
   * @param value Object value to set the field to.
   * @returns Method does not return a value
   * @example var glideRecord = new GlideRecord('incident');
   * glideRecord.query('priority','1');
   * glideRecord.next();
   * glideRecord.short_description.setValue('Network failure');
   * gs.info(glideRecord.short_description);
   */
  setValue(value: object | string): void;

  /**
   * Converts the value to a string.
   * @param value Object value to set the field to.
   * @returns The value as a string
   * @example var glideRecord = new GlideRecord('incident');
   * glideRecord.query('priority','1');
   * glideRecord.next();
   * gs.info(glideRecord.opened_at.toString());
   */
  toString(): string;
}

/**
 * The scoped GlideElementDescriptor API provides information about individual fields.
 */
interface GlideElementDescriptor {
  /**
   * Returns the encryption type used for attachments on the element's table.
   * @returns The encryption type used on attachments. Returns null if attachments on the
   * element's table are not being encrypted.
   * 
   * @example 
   * 
  * var grInc = new GlideRecord('incident');
  * grInc.query('priority', '1');
  * var field = grInc.getElement('priority');
  * var ed = field.getED();
  * var isEdge = ed.getAttachmentEncryptionType();
  * gs.info(isEdge);
   *
   */
  getAttachmentEncryptionType(): string;
  /**
   * Returns the element's encryption type.
   * 
   * @returns The element's encryption type. Returns null if the element is not encrypted.
   * @example 
   * 
   * var grInc = new GlideRecord('incident');
   * grInc.query('priority', '1');
   * var field = grInc.getElement('priority');
   * var ed = field.getED();
   * sEdge = ed.getEncryptionType();
   * gs.info(isEdge);
   */
  getEncryptionType(): string;
  /**
   * Returns the element's internal data type.
   * @returns The element's internal data type.
   * @example var grInc = new GlideRecord('incident');
   * grInc.query('priority', '1');
   * var field = grInc.getElement('priority');
   * var ed = field.getED();
   * var isEdge = ed.getInternalType();
   * gs.info(isEdge);
   */
  getInternalType(): string;
  /**
   * Returns the element's label.
   * @returns The element's label.
   * @example var grInc = new GlideRecord('incident');
   * grInc.query('priority', '1');
   * var field = grInc.getElement('priority');
   * var ed = field.getED();
   * var isEdge = ed.getLabel();
   * gs.info(isEdge);
   */
  getLabel(): string;
  /**
   * Returns the element's length.
   * @returns The element's size.
   * @example var grInc = new GlideRecord('incident');
   * grInc.query('priority', '1');
   * var field = grInc.getElement('priority');
   * var ed = field.getED();
   * var isEdge = ed.getLength();
   * gs.info(isEdge);
   */

  getLength(): number;
  getName(): string;
  getPlural(): boolean;
  hasAttachmentsEncrypted(): boolean;
  isAutoOrSysID(): boolean;
  isChoiceTable(): boolean;
  isEdgeEncrypted(): boolean;
  isVirtual(): boolean;
}
