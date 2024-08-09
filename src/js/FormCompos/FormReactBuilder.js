import React, { useEffect } from 'react';
import './FormCompos.css';

const FormContext = React.createContext();
const FORM_ENUM = {
  PROPS: {
    AUTO_COMPLETE: { OFF: "off", ON: "on" },
    ENCTYPE: { ENCODED: "application/x-www-form-urlencoded", FILES: "multipart/form-data" }
  },
  FEATURES: {
    AUTO_VALIDATE(val) {

    },
  }
};

function insertProp(rootObj, name, value) {
  rootObj.props[name] = value;
  return rootObj;
}

function FormReactBuilder() {
  return {
    props: {},
    name(val) { return insertProp(this, 'name', val) },
    action(val) { return insertProp(this, 'action', val) },
    method(val) { return insertProp(this, 'method', val) },
    autoComplete(val) { return insertProp(this, 'autoComplete', val) },
    noValidated(val) { return insertProp(this, 'noValidated', val) },
    target(val) { return insertProp(this, 'target', val) },
    children: [],
    addFormChild(component) { this.children.push(component); return this; },
    build() {
      const rootObj = this;
      const Component = function () {
        //--InitValue: [false] with length is "children".length.
        const [validationRes, setValidationRes] = React.useState(rootObj.children.map(ignored => true));

        const setSpecifiedValidationRes = React.useCallback((val, ind) => {
          setValidationRes(prev => {
            prev[ind] = val;
            return prev;
          });
        });
        
        const handleOnSubmit = React.useCallback((e) => {
          e.preventDefault();
          if (validationRes.every(validationRes => validationRes)) {
          } else {
            console.log("Error");
            //--.......
          }
        }, []);

        return (
          <FormContext.Provider value={{ validationRes, setSpecifiedValidationRes }}>
            <form {...rootObj.props} onSubmit={handleOnSubmit}>
              {rootObj.children.map((Component, index) =>
                <Component key={index} index={index}/>
              )}
              <button>Submit</button>
            </form>
          </FormContext.Provider>
        );
      };

      return React.memo(Component);
    }
  };
}

export { FORM_ENUM, FormReactBuilder, FormContext }