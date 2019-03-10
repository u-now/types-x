declare class XMLDocument2 {
  constructor();
  createElement(name: string): servicenow.XMLNode;
  createElementWithTextValue(name: string, value: string): servicenow.XMLNode;
  getDocumentElement(): servicenow.XMLNode;
  getFirstNode(xpath: string): servicenow.XMLNode;
  getNextNode(prev: object): servicenow.XMLNode;
  getNode(xpath: string): servicenow.XMLNode;
  getNodeText(xpath: string): string;
  parseXML(xmlDoc: string): void;
  setCurrentElement(element: servicenow.XMLNode): void;
  toString(): string;
}
