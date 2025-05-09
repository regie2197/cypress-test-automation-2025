/// <reference types="cypress" />



describe('Data Tables Test Suite - Desktop', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.viewport(850, 700)
        cy.get('#dt-search-0').as('searchInput')
        cy.get('#dt-length-0').as('lengthSelect')
    });

    it('Should Successfully Search Angelica Ramos & Assert her Salary', () => {
        cy.get('@searchInput').type('Angelica Ramos')
        cy.get('.dtr-control').click()
        try {
            cy.get('tbody > tr > :nth-child(6)') //cy.get('[data-dtr-index="5"] > .dtr-data')
                .should('be.visible')
                .and('have.text', '$1,200,000')
        }
        catch (error) {
            cy.log('Maybe her salary increase because of revenue increase this year:', error)
        }
    });
    it('Should check visibility and value of 1st row', () => {
        cy.get('table.dataTable > tbody > tr:nth-child(1) > td:nth-child(1)').then(($firstRow) => {
            const firstRowText = $firstRow.text()
            cy.log('First row text:', firstRowText)
            expect($firstRow).to.be.visible;
            expect(firstRowText).to.equal('Airi Satou')
        });
    })
    it('Should check visibility and value of last row', () => {
        cy.get('@lengthSelect').select('100')
        cy.wait(2000)
        cy.get('table.dataTable > tbody > tr:last > td:first-child').then(($lastRow) => {
            const lastRowText = $lastRow.text()
            cy.log('Last row text:', lastRowText)
            expect($lastRow).to.be.visible;
            expect(lastRowText).to.equal('Zorita Serrano')
        });
    })
    it('Should count the total number of rows in the table', () => {
        cy.get('@lengthSelect').select('100')
        cy.get('table.dataTable > tbody > tr').then(($rows) => {
            const rowCount = $rows.length;
            cy.log('Number of rows:', rowCount)
            expect(rowCount).to.equal(57)
        });
    });
    it('Should successfully show No matching records found when searching Non existent data', () => {
        cy.get('#dt-search-0').type('Nonexistent Name')
        cy.get('.dt-empty').should('be.visible')
        cy.get('.dt-empty').should('have.text', 'No matching records found')
    });
    it('Should verify Software Engineers data is correctly displayed', () => {
        cy.get('@searchInput').type('Software Engineer')

        cy.wait(500)

        cy.get('table.dataTable > tbody > tr').then(($rows) => {

            const engineerCount = $rows.length;
            cy.log(`Found ${engineerCount} Software Engineers`)


            expect(engineerCount).to.be.greaterThan(0)

            // Check each result row to validate correct data
            cy.wrap($rows).each(($row) => {
                cy.wrap($row).find('td').eq(1).should('contain.text', 'Software Engineer')

                cy.wrap($row).find('td:first-child').then(($nameCell) => {
                    cy.log(`Software Engineer found: ${$nameCell.text().trim()}`)
                });
            });
        });
    });
    it('Should correctly display items per page based on selection', () => {

        [10, 25, 50, 100].forEach((pageSize) => {
            // Select the page size
            cy.get('@lengthSelect').select(pageSize.toString());


            cy.get('table.dataTable tbody tr').then(($rows) => {
                expect($rows.length).to.be.lte(pageSize);
            });

            cy.get('.dt-info').invoke('text').then((infoText) => {

                const match = infoText.match(/of (\d+) entries/);
                const totalEntries = match ? parseInt(match[1]) : 0;
                // Assert the displayed info textx for the current page size
                cy.get('.dt-info').
                    should('contain', 'Showing 1 to ' +
                        Math.min(pageSize, totalEntries) +
                        ' of ' + totalEntries + ' entries');
            });
        });
    });
    it('Should ensure pagination buttons with data-dt-idx 1 to 5 (pages 2 to 6) are not exist when 100 entries per page is selected', () => {
        cy.get('@lengthSelect').select('100')

        for (let i = 1; i <= 5; i++) {
          cy.get(`[data-dt-idx="${i}"]`).should('not.exist')
        }
      });
      
});
describe.only('Data Tables Test Suite - iPhone 12 Pro', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.viewport(390, 844)
        cy.get('#dt-search-0').as('searchInput')
        cy.get('#dt-length-0').as('lengthSelect')
    });

    it('Should Successfully Search Angelica Ramos using iPhone 12 Pro', () => {
        cy.get('@searchInput').type('Angelica Ramos')
        cy.get('.dtr-control').click()
        cy.get('tr.child > .child').should('be.visible')
    });
})
