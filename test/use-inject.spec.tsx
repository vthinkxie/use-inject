import { useInject, DIContainer } from "../src";
import { act, create } from "react-test-renderer";
import { useEffect } from "react";
import { Injectable } from "injection-js";
import "@abraham/reflection";
describe("useInject", () => {
  it("should useInject work", () => {
    let data = null;
    @Injectable()
    class LowLevelClass {
      level = "low-level";
    }

    @Injectable()
    class HighLevelClass {
      constructor(public lowLevelClass: LowLevelClass) {}
    }
    function Component() {
      const level = useInject(HighLevelClass).lowLevelClass.level;
      useEffect(() => {
        data = level;
      }, []);
      return <></>;
    }

    function DI() {
      return (
        <DIContainer providers={[HighLevelClass, LowLevelClass]}>
          <Component></Component>
        </DIContainer>
      );
    }
    const fixtureNode = <DI />;
    const testRenderer = create(fixtureNode);
    expect(data).toBe(null);
    act(() => testRenderer.update(fixtureNode));
    expect(data).toBe("low-level");
  });
  it("should useInject nested work", () => {
    let data = null;
    @Injectable()
    class LowLevelClass {
      level = "low-level";
    }

    @Injectable()
    class HighLevelClass {
      constructor(public lowLevelClass: LowLevelClass) {}
    }
    function Component() {
      const level = useInject(HighLevelClass).lowLevelClass.level;
      useEffect(() => {
        data = level;
      }, []);
      return <></>;
    }

    function DI() {
      return (
        <DIContainer providers={[LowLevelClass]}>
          <DIContainer providers={[HighLevelClass]}>
            <Component></Component>
          </DIContainer>
        </DIContainer>
      );
    }
    const fixtureNode = <DI />;
    const testRenderer = create(fixtureNode);
    expect(data).toBe(null);
    act(() => testRenderer.update(fixtureNode));
    expect(data).toBe("low-level");
  });
});
