import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

import classNames from "classnames";
import { CheckIcon, ChevronIcon } from "../icons";
import { isEmpty } from "lodash";

export interface selectType {
  name: string;
  id: string;
}

interface SelectedProps<T> {
  label: string;
  selected: T;
  isLoading: boolean;
  disabled?: boolean;
  setSelected: (item: T) => void;
  items: T[];
}

export function SelectedMenu<T extends selectType>({
  label,
  selected,
  setSelected,
  isLoading,
  disabled,
  items,
}: SelectedProps<T>) {
  return (
    <Listbox value={selected} onChange={setSelected} disabled={disabled}>
      {({ open }) => (
        <div>
          <Listbox.Label className="block text-sm font-semibold leading-6 text-primary-80">
            {label}
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white h-12 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-100 sm:text-sm sm:leading-6">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronIcon aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {isLoading ? (
                  "Patienter..."
                ) : !isEmpty(items) ? (
                  items.map((item) => (
                    <Listbox.Option
                      key={item.id}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "bg-primary-100 text-white"
                            : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {item.name}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-primary-100",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))
                ) : (
                  <div className="flex justify-center items-center h-full w-full">
                    <span>Aucune Données</span>
                  </div>
                )}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}
