# Ocular

Ocular is a library that allows managing multiple configuration files. It uses jackson to interact with different dataformats.
Everything is customizable, but reasonable defaults are given to start right away.


=== "gradle.build.kts"

    ```java
    implementation("dev.chojo", "ocular", "{{ VC_LIBRARY_OCULAR_VERSION }}")
    ```

=== "pom.xml"

    ```xml
    <dependency>
        <groupId>dev.chojo</groupId>
        <artifactId>ocular</artifactId>
        <version>{{ VC_LIBRARY_OCULAR_VERSION }}</version>
    </dependency>
    ```

!!! warning

    You will need to import your desired data format for jackson additionally.
